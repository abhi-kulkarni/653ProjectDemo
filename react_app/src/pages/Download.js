import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import '../static/css/custom.css'

const Download = (props) => {
    
  const history = useHistory();

  const redirectPage = (page) => {
      history.push(page);
  }

  const downloadSoftwareTrial = () => {
    // download logic
  }

  return (
    <Row style={{ padding: '0px', margin: '0px' }}>
      <Col style={{ padding: '0px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
        <div style={{ height: '300px' }}>
          <div className="bgimg-1"></div>
        </div>

        <div className="download_section_0" style={{ paddingBottom: '0px'}}>
          <h3 style={{ textAlign: 'center', textTransform: 'capitalize', color: '#0879FA' }}>Installation Requirements</h3>
          <Row style={{ padding: '15px 0px', margin: '0px' }}>
            <Col style={{ padding: '0px', margin: '0px' }} xs={2} sm={2} md={2} lg={3} xl={3}></Col>
            <Col style={{ color: 'gray', fontSize: '0.85rem', padding: '0px', margin: '0px' }} xs={7} sm={7} md={7} lg={7} xl={7}>
                <ul>
                  <li>Storlytics is not meant to run on a server or on a Remote Desktop Client.</li>
                  <li>It has to be installed on the workstation where it will be used.</li>
                  <li>Storlytics runs only under Windows (with a virtual machine for others OS – VirtualBox, Parallels, etc).</li>
                  <li>The program works properly in full license mode only if the computer’s date and time are correct and have never been modified.Storlytics is not liable if the program does not work because the computer’s clock has been changed.</li>
                </ul>
            </Col>
          </Row>
        </div>

        <div className="bgimg-2">
        </div>

        <div className="download_section_0">
        <h3 style={{ textAlign: 'center', textTransform: 'capitalize', color: '#0879FA' }}>Required computer configuration</h3>
          <Row style={{ padding: '15px 0px', margin: '0px' }}>
          <Col style={{ color: 'gray', fontSize: '0.85rem', padding: '0px', margin: '0px' }} xs={0} sm={0} md={0} lg={1} xl={1}></Col>
            <Col style={{ color: 'gray', padding: '0px', margin: '0px' }} xs={12} sm={12} md={12} lg={10} xl={10}>
              <Table style={{ color: 'gray', fontSize: '0.85rem' }} responsive bordered>
                <tbody className="requirements_table">
                <tr style={{ backgroundColor: '#F8F9FA' }}>
                    <td>
                    <div style={{ width: '220px' }}>Operating System:	</div>
                    </td>
                    <td>
                    <div>
                      <ul>
                        <li>
                        All Windows client versions currently supported by Microsoft: Windows 8, Windows 10 (32-bit or 64-bit)
                        </li>
                        <li>
                          Up-to-date Windows 7 systems
                        </li>
                        <li>
                          Other OS may support Storlytics installation and execution but no guarantee can be provided. This effectively depends on many parameters….
                        </li>
                      </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>OS not supported:	</td>
                    <td>
                      <ul>
                        <li>
                        Windows servers, Application servers (Citrix, ZenDesktop, ZenApp)
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#F8F9FA' }}>
                    <td>Other requirements:	</td>
                    <td>
                      <ul>
                        <li>
                        At least 1 GB of RAM
                        </li>
                        <li>
                        At least 1 GB of free hard drive space
                        </li>
                        <li>
                        Minimal screen resolution of 1280 x 720 pixels
                        </li>
                        <li>
                        .NET 4.8 framework (for Meteonorm)
                        </li>
                        <li>
                        Graphics card supporting OpenGL 2.0 or higher
                        </li>
                        <li>
                        Storlytics workspace does not support shared or remotely synced drives / folders (including OneDrive, Google Drive, Dropbox, etc…). Files and workspaces can be synced as a separate task, once Storlytics has been closed.
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>

        <div className="bgimg-3">
        </div>
        
        <div className="download_section_0">
          <Row style={{ margin: '0px', padding: '0px' }}>
            <Col style={{ textAlign: 'center', margin: '0px', padding: '0px 0px 20px 0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
              <h5 style={{ fontWeight: 'light', color: '#0879FA', padding: '20px' }}>Latest version <br/> One free month trial with full features</h5>
              <Button onClick={() => downloadSoftwareTrial()} size="md" variant="outline-primary">Download</Button>
            </Col>
          </Row>
        </div>

      </Col>
    </Row>
  );
}

export default withRouter(Download);
