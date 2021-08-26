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
    navigator.clipboard.writeText("")
    document.getElementById('scan').addEventListener('click', () => {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                if (!result.cancelled) {
                    document.getElementById('resValue').innerHTML = result.text
                    document.getElementById('resType').innerHTML = result.format
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera: false, // iOS and Android
                showFlipCameraButton: false, // iOS and Android
                showTorchButton: false, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                orientation: "potrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
                // formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            }
        )
    })

    document.getElementById('copy').addEventListener('click', () => {
        var text = document.getElementById('resValue').innerHTML
        if (text !== 'No Result') {
            navigator.clipboard.writeText(text)
            alert("Copied the text: " + text)
        }
    })
}
