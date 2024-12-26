"use client";

import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";

import { Button, Col, Row, Slider, Tooltip, Typography } from "antd";
import {
  FallOutlined,
  MutedFilled,
  MutedOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
  RedoOutlined,
  RiseOutlined,
  SoundFilled,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";
import MinimapPlugin from "wavesurfer.js/dist/plugins/minimap.js";
import dynamic from "next/dynamic";
import WaveSurfer from "wavesurfer.js";

const { Title, Paragraph, Text, Link } = Typography;

const formWaveSurferOptions = (ref: HTMLDivElement) => ({
  container: ref,
  waveColor: "#8b8b8b",

  progressColor: "green", // OrangeRed
  cursorColor: "red", // OrangeRed

  responsive: true,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  scrollbars: true,

  barGap: 1,
  height: 60,
  barHeight: 20,
  barRadius: 20,
  barWidth: 5,
});
interface IWaveform {
  url: string;
}
export const Waveform: FC<IWaveform> = ({ url }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  let wavesurfer = useRef<WaveSurfer | null>(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoop, setIsLoop] = useState(false);
  let wavesurferTest;

  const random = (min: number, max: number) =>
    Math.random() * (max - min) + min;
  const randomColor = () =>
    `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);
    if (waveformRef.current && document) {
      const options = formWaveSurferOptions(waveformRef.current);
      wavesurferTest = WaveSurfer.create(options);
      if (wavesurferTest) {
        const ws = wavesurferTest;
        wavesurfer.current = ws;
        const wsRegions = ws.registerPlugin(RegionsPlugin.create());
        // ws.registerPlugin(TimelinePlugin.create());
        ws.registerPlugin(
          MinimapPlugin.create({
            height: 20,
            waveColor: "#ddd",
            progressColor: "#999",
          })
        );

        // plugin
        ws.on("decode", () => {
          // Regions
          wsRegions.addRegion({
            start: 5,
            end: 10,
            content: "",
            color: "rgba(211, 64, 33, 0.3)", // randomColor()
            minLength: 1,
            id: "loop-content-id",
          });

          // Markers (zero-length regions)
          // wsRegions.addRegion({
          //   start: 19,
          //   content: "Marker",
          //   color: randomColor(),
          // });
          // wsRegions.addRegion({
          //   start: 20,
          //   content: "Second marker",
          //   color: randomColor(),
          // });
        });
        wsRegions.enableDragSelection({
          color: "rgba(255, 0, 0, 0.1)",
        });

        wsRegions.on("region-created", (region) => {
          wsRegions.getRegions().forEach((r) => {
            if (r.id !== region.id) {
              r.remove();
            }
          });
        });
        wsRegions.on("region-updated", (region) => {});

        let activeRegion: any = null;

        wsRegions.on("region-in", (region) => {
          activeRegion = region;
        });
        let isLoop = false;
        wsRegions.on("region-out", (region) => {
          if (activeRegion === region) {
            isLoop =
              document
                .querySelector("#btn-isLoop")
                ?.getAttribute("data-checked") === "true"
                ? true
                : false;

            if (isLoop) {
              region.play();
            } else {
              activeRegion = null;
            }
          }
        });
        wsRegions.on("region-clicked", (region, e) => {
          e.stopPropagation(); // prevent triggering a click on the waveform
          activeRegion = region;
          region.play();
        });
        // Reset the active region when the user clicks anywhere in the waveform
        ws.on("interaction", () => {
          activeRegion = null;
        });
        // end

        wavesurfer.current.load(url);

        wavesurfer.current.on("ready", function () {
          // https://wavesurfer-js.org/docs/methods.html
          // wavesurfer.current.play();
          // setPlay(true);

          // make sure object stillavailable when file loaded
          if (wavesurfer.current) {
            wavesurfer.current.setVolume(volume);
            setVolume(volume);
          }
        });
      }
    }
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current?.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current?.playPause();
  };

  const onVolumeChange = (value: number) => {
    const newVolume = value / 100;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current?.setVolume(newVolume || 1);
    }
  };
  const formatter = (value: number | undefined) => `${value}`;
  const speedFormater = (value: number | undefined) => `${value}`;
  const [speed, setSpeed] = useState(3);
  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];
  let test = setTimeout(() => {
    console.log('binhtest')
  }, 2000);
  return (
    <div className="sticky top-[63px] z-50 bg-white pt-6 border-b-[1px] border-solid" >
      <div id="waveform" ref={waveformRef} />
      <Row gutter={[0, 24]}>
        <Col className="gutter-row flex" span={0} md={{ span: 8 }}>
          <div className="w-full flex gap-4">
            <Tooltip placement="top" title="Zoom in & zoom out">
              <div className="flex-1 flex justify-center items-center">
                <ZoomOutOutlined />
                <Slider
                  min={10}
                  max={100}
                  step={1}
                  tooltip={{ formatter }}
                  id="zoom-setting"
                  className="flex-1 [&_.ant-slider-rail]:!bg-red-400 !mx-4"
                  // value={volume * 100}
                  onChange={(value) => {
                    wavesurfer.current?.zoom(value * 10);
                  }}
                />
                <ZoomInOutlined />
              </div>
            </Tooltip>
            <Tooltip placement="top" title="Jutify speed">
              <div className="flex-1 flex justify-center items-center">
                <Slider
                  id="zoom-1"
                  tooltip={{
                    formatter: (value: number | undefined) =>
                      `${speeds[value || 0]}`,
                  }}
                  min={0}
                  max={6}
                  step={1}
                  value={speed}
                  className="flex-1 [&_.ant-slider-rail]:!bg-red-400 !mx-4"
                  // value={volume * 100}
                  onChange={(value) => {
                    setSpeed(value);
                    wavesurfer.current?.setPlaybackRate(speeds[value], true);
                    // wavesurfer.current?.setPlaybackRate(value);
                  }}
                />
                <Typography>
                  <Paragraph className="!m-0">x{speed/3} Speed</Paragraph>
                </Typography>
                {/* <ZoomInOutlined /> */}
              </div>
            </Tooltip>
          </div>
        </Col>
        <Col className="gutter-row flex" span={12} md={{ span: 8 }}>
          <div className="w-full flex justify-center items-center">
            <Tooltip placement="top" title="Play">
              <Button
                className="mr-2"
                type={playing ? "primary" : "default"}
                onClick={handlePlayPause}
                icon={!playing ? <PlayCircleFilled /> : <PauseCircleFilled />}
                size="large"
                shape="round"
              ></Button>
            </Tooltip>

            <div className="form-control">
              <label className="label cursor-pointer justify-start">
                <Tooltip placement="top" title="Enalbe Loop">
                  <Button
                    {...(isLoop && {
                      type: "primary",
                    })}
                    id="btn-isLoop"
                    data-checked={isLoop}
                    onClick={() => {
                      setIsLoop((prev) => !prev);
                    }}
                    type={isLoop ? "primary" : "default"}
                    shape="round"
                    icon={<RedoOutlined />}
                  />
                </Tooltip>
              </label>
            </div>
          </div>
        </Col>
        <Col className="gutter-row flex" span={12} md={{ span: 8 }}>
          <div className="controls flex">
            <Tooltip placement="top" title="Justify volume">
              <div className="w-full flex justify-center items-center">
                <SoundFilled />
                <Slider
                  className="flex-1 [&_.ant-slider-rail]:!bg-red-400"
                  value={volume * 100}
                  onChange={onVolumeChange}
                />
              </div>
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  );
};
