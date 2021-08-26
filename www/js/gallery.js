/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Camera
    document.getElementById('result').style.height = "0"
    document.getElementById('result').style.visibility = "hidden"
    // document.getElementById('placeholder2').style.height = "auto"
    document.getElementById('placeholder').style.visibility = "visible"
    document.getElementById('placeholder').style.position = "static"
    document.getElementById('buttonCamera').addEventListener('click', () => {
        navigator.camera.getPicture((s) => {
            document.getElementById('result').style.height = "auto"
            document.getElementById('result').style.visibility = "visible"
            document.getElementById('placeholder').style.visibility = "hidden"
            document.getElementById('placeholder').style.position = "absolute"
            // document.getElementById('placeholder2').style.height = "0"
            document.getElementById('result').setAttribute('src', 'data:image/png;base64, ' + s)
        }, (e) => {
        }, {
            quality: 60,
            cameraDirection: 1,
            destinationType: 0,
            correctOrientation: true
        })
    })
}
