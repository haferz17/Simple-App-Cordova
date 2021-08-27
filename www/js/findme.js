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
    // Leaflet
    document.getElementById('buttonWatch').style.visibility = "visible"
    document.getElementById('buttonStopWatch').style.visibility = "hidden"
    var map = L.map('mapLeaflet', { zoomControl: false }).setView([-6.200000, 106.816666], 10);
    var wp = null
    var marker = null
    var Latitude, Longitude

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    marker = L.marker([-6.200000, 106.816666]).addTo(map)
        .bindPopup('Hi James')
        .openPopup();

    document.getElementById('buttonLoc').addEventListener('click', () => {
        if (marker) map.removeLayer(marker)
        navigator.geolocation.getCurrentPosition(position => {
            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;
            marker = L.marker([Latitude, Longitude]).addTo(map)
                .bindPopup('You are here now')
                .openPopup();
            map.setView([Latitude, Longitude], 15)
        }, error => {
            console.log('code: ', error)
        }, {
            enableHighAccuracy: true
        });
    })

    document.getElementById('buttonWatch').addEventListener('click', () => {
        document.getElementById('buttonWatch').style.visibility = "hidden"
        document.getElementById('buttonStopWatch').style.visibility = "visible"
        if (marker) map.removeLayer(marker)
        wp = navigator.geolocation.watchPosition(position => {
            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;
            if (marker) map.removeLayer(marker)
            marker = L.marker([Latitude, Longitude]).addTo(map);
            map.setView([Latitude, Longitude], 13)
        }, error => {
            console.log('code: ', error)
        }, {
            enableHighAccuracy: true
        });
    })

    document.getElementById('buttonStopWatch').addEventListener('click', () => {
        document.getElementById('buttonWatch').style.visibility = "visible"
        document.getElementById('buttonStopWatch').style.visibility = "hidden"
        navigator.geolocation.clearWatch(wp)
    })
}
