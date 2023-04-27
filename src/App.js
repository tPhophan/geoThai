import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  ScaleControl,
} from "react-leaflet";

import bangkok from "./bangkok.json";

export default function App() {
  const [info, setInfo] = useState({
    select: null,
    data: {},
    visible: false,
  });
  const [position, setPosition] = useState(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (map) {
      console.log("map", map.target);
      map.target.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        console.log("e.latlng", e.latlng);
        map.target.flyTo(e.latlng, map.target.getZoom());
      });
    }
  }, [map]);

  const formatNumber = (value) => {
    return parseFloat(value).toLocaleString("th-TH", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  /* function convertJson() {
    const newData = [...bangkok?.features];
    bangkok?.features?.map((item, index) => {
      let data = convert?.find(
        (f, index2) => f.nameTh === item?.properties?.nameTh
      );
      newData.splice(index, 1, {
        ...item,
        properties: {
          ...item.properties,
          man: parseInt(data?.man.replace(",", "")) / 1000,
          woman: parseInt(data?.woman.replace(",", "")) / 1000,
          total: parseInt(data?.total.replace(",", "")) / 1000,
        },
      });
    });
    console.log("newData", newData);
    setData((prev) => ({
      ...prev,
      features: newData,
    }));
  } */

  /* function getColor(d) {
    return d > 3000
      ? "#800026"
      : d > 2500
      ? "#BD0026"
      : d > 2000
      ? "#E31A1C"
      : d > 1500
      ? "#FC4E2A"
      : d > 1000
      ? "#FD8D3C"
      : d > 500
      ? "#FEB24C"
      : d > 250
      ? "#FED976"
      : "#FFEDA0";
  } */

  /* function getColorBangkok(d) {
    return d > 200
      ? "#800026"
      : d > 175
      ? "#BD0026"
      : d > 150
      ? "#E31A1C"
      : d > 125
      ? "#FC4E2A"
      : d > 100
      ? "#FD8D3C"
      : d > 75
      ? "#FEB24C"
      : d > 50
      ? "#FED976"
      : "#FFEDA0";
  } */

  function getColorCounty(dcode, a) {
    switch (dcode) {
      case [
        "1001",
        "1002",
        "1008",
        "1013",
        "1014",
        "1037",
        "1017",
        "1026",
        "1045",
      ].find((f) => f === dcode):
        return `rgba(156, 39, 176, ${a})`;
      case [
        "1007",
        "1004",
        "1028",
        "1031",
        "1012",
        "1033",
        "1039",
        "1034",
        "1009",
        "1047",
      ].find((f) => f === dcode):
        return `rgba(129, 119, 23, ${a})`;
      case ["1023", "1050", "1021", "1049", "1024", "1022", "1040"].find(
        (f) => f === dcode
      ):
        return `rgba(78, 52, 46, ${a})`;
      case [
        "1025",
        "1020",
        "1016",
        "1015",
        "1018",
        "1019",
        "1035",
        /* "1048", */
      ].find((f) => f === dcode):
        return `rgba(124, 179, 66, ${a})`;
      case ["1038", "1030", "1029", "1042", "1036", "1005", "1041"].find(
        (f) => f === dcode
      ):
        return `rgba(243, 177, 71, ${a})`;
      case [
        "1006",
        "1011",
        "1032",
        "1044",
        "1003",
        "1010",
        "1046",
        "1043",
        "1027",
      ].find((f) => f === dcode):
        return `rgba(34, 148, 208, ${a})`;
      default:
        return `rgba(0, 0, 0, 0)`;
    }
  }

  /* function style(feature) {
    return {
      fillColor: getColor(feature.properties.total),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.6,
    };
  } */

  function styleBangkok(feature) {
    return {
      color: getColorCounty(feature.properties.dcode, 1),
      dashArray: "3",
      fillColor: getColorCounty(feature.properties.dcode, 0.6),
      fillOpacity: 0.7,
      opacity: 1,
      weight: 3,
    };
  }

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  useEffect(() => {
    console.log("position", position);
  }, [position]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          display: info?.visible ? "flex" : "none",
          zIndex: "1040",
          background: "white",
          height: "93vh",
          padding: "10px",
          width: "250px",
          borderRadius: "10px",
        }}
      >
        {`ชื่อภาษาอังกฤษ : ${info?.data?.name ?? " - "} `}
        <br></br>
        {`ชื่อภาษาไทย : ${info?.data?.nameTh ?? " - "} `}
        <br></br>
        {`ชาย : ${formatNumber(info?.data?.man * 1000)} คน `}
        <br></br>
        {`หญิง : ${formatNumber(info?.data?.woman * 1000)} คน `}
        <br></br>
        {`ทั้งหมด : ${formatNumber(info?.data?.total * 1000)} คน `}
        <br></br>
      </div>

      {/* <div
        style={{
          position: "absolute",
          display: "inline-block",
          textAlign: "center",
          zIndex: "1040",
          background: "white",
          height: "auto",
          padding: "10px",
          width: "200px",
          right: 10,
          bottom: 10,
          borderRadius: "10px",
          opacity: "0.7",
        }}
      >
        <h4>จำนวนประชากร</h4>
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              backgroundColor: "#800026",
              width: "20px",
              height: "20px",
              margin: "0px 10px 5px 10px",
            }}
          />
          <span>{">"} 200,001</span>
        </div>

        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              backgroundColor: "#BD0026",
              width: "20px",
              height: "20px",
              margin: "0px 10px 5px 10px",
            }}
          />
          <span>175,001 {"-"} 200,000</span>
        </div>

        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              backgroundColor: "#E31A1C",
              width: "20px",
              height: "20px",
              margin: "0px 10px 5px 10px",
            }}
          />
          <span>150,001 {"-"} 175,000</span>
        </div>

        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              backgroundColor: "#FC4E2A",
              width: "20px",
              height: "20px",
              margin: "0px 10px 5px 10px",
            }}
          />
          <span>125,001 {"-"} 150,000</span>
        </div>

        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              backgroundColor: "#FD8D3C",
              width: "20px",
              height: "20px",
              margin: "0px 10px 5px 10px",
            }}
          />
          <span>100,001 {"-"} 125,000</span>
        </div>

        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              backgroundColor: "#FEB24C",
              width: "20px",
              height: "20px",
              margin: "0px 10px 5px 10px",
            }}
          />
          <span>75,001 {"-"} 100,000</span>
        </div>

        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              backgroundColor: "#FED976",
              width: "20px",
              height: "20px",
              margin: "0px 10px 5px 10px",
            }}
          />
          <span>50,001 {"-"} 75,000</span>
        </div>

        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              backgroundColor: "#FFEDA0",
              width: "20px",
              height: "20px",
              margin: "0px 10px 5px 10px",
            }}
          />
          <span>{"<"} 50,000</span>
        </div>
      </div> */}

      <MapContainer
        className="markercluster-map"
        //center={[13, 101.5]}
        center={[13.718522548482612, 100.62280533224798]}
        zoom={11}
        style={containerStyle}
        attributionControl={true}
        doubleClickZoom={false}
        whenReady={setMap}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ScaleControl position="bottomleft" />

        {bangkok ? (
          <GeoJSON
            data={bangkok}
            style={styleBangkok}
            eventHandlers={{
              click: (e) => {
                const data = e.layer.feature.properties;
                if (info?.select === data.name) {
                  setInfo({
                    select: null,
                    data: data,
                    visible: false,
                  });
                } else {
                  setInfo({
                    select: data.name,
                    data: data,
                    visible: true,
                  });
                }
              },
              mouseover: (e) => {
                e.layer.setStyle({
                  dashArray: "",
                  fillOpacity: 0.9,
                });
              },
              mouseout: (e) => {
                e.layer.setStyle({
                  dashArray: "2",
                  fillOpacity: 0.7,
                });
              },
            }}
          />
        ) : null}

        {position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}
