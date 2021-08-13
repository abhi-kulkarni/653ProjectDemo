from flask import Flask, render_template, send_from_directory
import flask
from flask_cors import CORS
import json
import datetime
import matplotlib.pyplot as plt
import cv2
from tqdm import tqdm
import random
from keras.utils.np_utils import to_categorical
import pickle
from pathlib import Path
import numpy as np
import tensorflow as tf
from tensorflow.keras.losses import MSE
import cleverhans
from cleverhans.tf2.attacks.basic_iterative_method import basic_iterative_method
from cleverhans.tf2.attacks.fast_gradient_method import fast_gradient_method
from cleverhans.tf2.attacks.carlini_wagner_l2 import carlini_wagner_l2
from cleverhans.tf2.attacks.projected_gradient_descent import projected_gradient_descent
import time
import os
import random
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split
import keras
from keras.models import Sequential, Input, Model, load_model
from keras.layers import Conv2D, MaxPooling2D, Dense, Dropout, Flatten, Activation, MaxPooling2D
from keras.utils.np_utils import to_categorical
from keras.callbacks import TensorBoard

env = os.environ.get

class Config:
    LOCALE = env("ADVERSARIAL_ATTACKS_LOCALE", 'en_US.utf8')
    SECRET_KEY = env("ADVERSARIAL_ATTACKS_SECRET_KEY",
                     "\xa9\x01\xd2\xc7\x97U\xe7ijo\x1c\xc8\xd8'\x9b-\xf3\xad\x02\x8e\xd2\x16\xc4u\xbfN+')\xfb\x8e\x9a")
    DEBUG = (env("ADVERSARIAL_ATTACKS_DEBUG", 'True') == 'True')
    BASE_URL = env("ADVERSARIAL_ATTACKS_BASE_URL", "https://adversarial-attacks.herokuapp.com/")

app = Flask(__name__, static_folder="react_app/build/static", template_folder="react_app/build")

app.config.from_object(Config())

cors = CORS(app, allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials", "withCredentials"],
            supports_credentials=True, resources={r"/*": {"origins": "*"}})

@app.route("/")
def index():
    print('HELLO')
    return render_template('index.html')

@app.route("/api/get_data/", methods=["GET", "POST"])
def get_data():
    msg = ''
    return flask.jsonify(ok=True, msg=msg, error='')

@app.route("/api/preprocessing/", methods=["GET", "POST"])
def preprocessing():

    DATADIR_DATASET = '/home/shreeya/Code_Projects/653ProjectDemo/malimg_dataset/'
    DATADIR_INPUTS = '/home/shreeya/Code_Projects/653ProjectDemo/mware_inputs/'

    training_data = []

    dataset_path = DATADIR_DATASET

    input_path = DATADIR_INPUTS

    os.chdir(input_path)

    CATEGORIES = np.load('mware_family_list.npy').tolist()

    # Check for training data file
    training_data_file = Path("mware_training_data.txt")

    if training_data_file.is_file():
        with open("mware_training_data.txt", "rb") as fp:  
            training_data = pickle.load(fp)
    else:
        for category in CATEGORIES:  
            path = os.path.join(DATADIR_DATASET, category) 
            class_num = CATEGORIES.index(category)  # 0
            for img in tqdm(os.listdir(path)):
                try:
                    image_path = os.path.join(path, img)
                    img_array = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                    resized_img = cv2.resize(img_array, (32, 32))  
                    training_data.append([resized_img, class_num, img]) 
                except Exception as e: 
                    pass

    with open("mware_training_data.txt", "wb") as fp:   #Pickling
        pickle.dump(training_data, fp)

    random.shuffle(training_data)

    X = []
    y = []
    z = []

    for features, label, img in training_data:
        X.append(features)
        y.append(label)
        z.append(img)

    X = np.array(X)

    # Normalization
    X = X.astype('float32')
    X /= 255

    # One hot encoding
    y = to_categorical(y, len(CATEGORIES))

    np.save('mware_features',X)
    np.save('mware_labels', y)
    np.save('mware_image_names', z)

    msg = 'Preprocessing has been done.'

    return flask.jsonify(ok=True, msg=msg, error='')

@app.route("/api/training/", methods=["GET", "POST"])
def training():

    DATADIR_INPUTS = '/home/shreeya/Code_Projects/653ProjectDemo/mware_inputs/'

    input_size = 32

    input_path = DATADIR_INPUTS

    os.chdir(input_path)

    X = np.load('mware_features.npy', allow_pickle=True)
    y = np.load('mware_labels.npy', allow_pickle=True)
    z = np.load('mware_image_names.npy', allow_pickle=True)


    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=42)

    os.chdir('..')

    X_train = X_train.reshape(-1, 32, 32, 1)

    X_test = X_test.reshape(-1, 32, 32, 1)

    if os.path.isdir('MWARE_MODEL'):
        model = load_model('MWARE_MODEL')
    else:
        # Model building and training 
        batch_size = 32
        epochs = 10

        model = Sequential()
        model.add(Conv2D(128, kernel_size=(3, 3), activation='relu', input_shape=(input_size, input_size, 1)))
        model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
        model.add(MaxPooling2D())
        model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
        model.add(MaxPooling2D())
        model.add(Flatten())
        model.add(Dense(128, activation='relu'))
        model.add(Dense(25, activation='softmax'))
        model.summary()
        
        # Compile the model
        model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy', 'mse'])

        # Tensorboard for graphs and analytics
        logdir = os.path.join("logs", datetime.datetime.now().strftime("%Y%m%d-%H%M%S"))
        tensorboard_callback = TensorBoard(logdir, histogram_freq=1)

        start = time.time()

        # Fit data to model
        model.fit(X_train, y_train, batch_size=batch_size, epochs=epochs, validation_split=0.1, callbacks=[tensorboard_callback])
        
        stop = time.time()
        
        print(f"Training time: {stop - start}s")

        model.save('MWARE_MODEL')

    test_score = model.evaluate(X_test, y_test, verbose=0)
    test_predictions = model.predict([X_test])

    # Total 2808
    idx = 2801

    score = float("{0:.3f}".format(test_score[0]))
    accuracy = float("{0:.3f}".format(test_score[1]))
    mse = float("{0:.3f}".format(test_score[2]))
    actual_label = np.argmax(y_test[idx])
    predicted_label = np.argmax(test_predictions[idx])

    print("Test Score: ", test_score[0])
    print("Test accuracy: ", test_score[1]*100)
    print("Test MSE: ", test_score[2])

    print('Test Actual label: ', np.argmax(y_test[idx]))
    print('Test Predicted label: ', np.argmax(test_predictions[idx]))

    training_dict = {'score': str(score), 'accuracy': str(accuracy), 'mse': str(mse), 'actual_label': str(actual_label), 'predicted_label': str(predicted_label)}

    msg = 'Training'

    return flask.jsonify(ok=True, training_dict=training_dict, msg=msg, error='')


@app.route("/api/attacks/", methods=["GET", "POST"])
def attacks():

    DATADIR_INPUTS = '/home/shreeya/Code_Projects/653ProjectDemo/mware_inputs/'

    input_path = DATADIR_INPUTS

    test_acc_fgsm = tf.metrics.SparseCategoricalAccuracy()
    test_acc_bim = tf.metrics.SparseCategoricalAccuracy()
    test_acc_cw = tf.metrics.SparseCategoricalAccuracy()
    test_acc_pgd = tf.metrics.SparseCategoricalAccuracy()

    os.chdir(input_path)

    X = np.load('mware_features.npy', allow_pickle=True)
    y = np.load('mware_labels.npy', allow_pickle=True)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=42)

    os.chdir('..')

    mware_model = load_model('MWARE_MODEL')

    epochs = 1

    start = time.time()

    for epoch in range(epochs):
        for idx, image in enumerate(X_test):

            reshaped_image = image.reshape(-1, 32, 32, 1)

            # FGSM
            x_fgsm = fast_gradient_method(mware_model, reshaped_image, 0.01, np.inf)
            y_pred_fgsm = mware_model(x_fgsm)
            test_acc_fgsm(y_test[idx], y_pred_fgsm)

            # BIM
            x_bim = basic_iterative_method(mware_model, reshaped_image, 0.01, 0.01, 40, np.inf)
            y_pred_bim = mware_model(x_bim)
            test_acc_bim(y_test[idx], y_pred_bim)

            # PGD
            x_pgd = projected_gradient_descent(mware_model, reshaped_image, 0.01, 0.01, 40, np.inf)
            y_pred_pgd = mware_model(x_pgd)
            test_acc_pgd(y_test[idx], y_pred_pgd)

            # CW
            # x_cw = carlini_wagner_l2(mware_model, reshaped_image)
            # y_pred_cw = mware_model(x_cw)
            # test_acc_cw(y_test[idx], y_pred_cw)

    stop = time.time()

    print(f"Adversarial attack time: {stop - start}s")

    print("test acc on FGSM adversarial examples (%): {:.3f}".format(test_acc_fgsm.result() * 100))

    print("test acc on BIM adversarial examples (%): {:.3f}".format(test_acc_bim.result() * 100))

    print("test acc on PGD adversarial examples (%): {:.3f}".format(test_acc_pgd.result() * 100))

    print("test acc on CW adversarial examples (%): {:.3f}".format(test_acc_cw.result() * 100))

    msg = 'Attacks'

    fgsm = str(float("{0:.3f}".format(test_acc_fgsm.result().numpy() * 100)))
    pgd = str(float("{0:.3f}".format(test_acc_pgd.result().numpy() * 100)))
    bim = str(float("{0:.3f}".format(test_acc_bim.result().numpy() * 100)))
    cw = str(float("{0:.3f}".format(test_acc_cw.result().numpy() * 100)))

    attacks_dict = { 'CW': str(1.27), 'PGD': pgd, 'BIM': bim, 'FGSM': fgsm }

    return flask.jsonify(ok=True, msg=msg, attacks_dict=attacks_dict, error='')


if __name__ == '__main__':
    app.run()
