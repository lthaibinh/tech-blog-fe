"use client";

import {
  Badge,
  Button,
  Form,
  FormInstance,
  Input,
  Pagination,
  Progress,
  Switch,
  Tooltip,
  notification,
  theme,
} from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { Item } from "./Item";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { IAccuracy, getAccuracy } from "../page";
import { useSession } from "next-auth/react";

const Waveform = dynamic(
  () =>
    import("@/components/pages/tests/Waveform").then((module) => ({
      default: module.Waveform,
    })),
  {
    ssr: false,
  }
);
interface IQuestion {
  audiourl: string;
  id: string;
  partid: string;
  questionnumber: string;
  result: string;
  setid: string;
  testid: string;
  transcript: string;
}
interface IQuestionItem {
  data: IQuestion[];
  params: {
    set: string;
    test: string;
    part: string;
  };
}
export function generateRandomArray(
  exceptionArr: number[],
  length: number,
  min: number,
  max: number
) {
  var randomArray = [];

  // Create an array of numbers from min to max
  var numbers = [];
  for (var i = min; i <= max; i++) {
    if (!exceptionArr.includes(i)) numbers.push(i);
  }

  // Shuffle the array of numbers
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * numbers.length);
    randomArray.push(numbers[randomIndex]);
    numbers.splice(randomIndex, 1); // Remove the selected number from the array
  }

  return randomArray;
}
export const QuestionItems: FC<IQuestionItem> = ({ data, params }) => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: "success" | 'error', message?: string) => {
    api[type]({
      message: "Notification",
      description: message || 'Internal Error !',
      duration: 0
    });
  };
  const [accuracies, setAccuracies] = useState<IAccuracy[]>([]);
  const formRefs = useRef<FormInstance[]>([]);
  const [num, setNum] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const [showHint, setShowHint] = useState({
    isShow: false,
    num: 4,
  });
  const { data: session, status } = useSession();

  const [rerandom, setRerandom] = useState(0);
  const partid = params.part;
  const setid = params.set;
  const testid = params.test;
  const email = session?.user?.email;
  const handleSubmit = ({ questionId }: { questionId: number }) => {
    let correctNumber = 0;
    let total = 0;
    formRefs.current?.forEach((form) => {
      let answer = form.getFieldsValue();
      Object.keys(answer).forEach((key) => {
        if (
          answer[key]
            ?.replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .trim() ===
          key
            .substring(1)
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()
            .trim()
        ) {
          correctNumber++;
        }
        total++;
      });
    });

    const test = fetch("/api/data/result", {
      method: "POST",
      body: JSON.stringify({
        partid,
        setid,
        testid,
        email,
        questionid: questionId,
        accuracy: ((correctNumber / total)*100).toFixed(2),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        openNotificationWithIcon('success', `You have heard correctly ${correctNumber}/${total} (${((correctNumber / total)*100).toFixed(2)}%) words !`)
        fetchAccuracy();
      }).catch(()=>{
        openNotificationWithIcon('error')
      });
  };
  const fetchAccuracy = () => {
    const searchParames = new URLSearchParams({
      partid,
      setid,
      testid,
      email: email || "",
    });
    fetch("/api/data/result?" + searchParames.toString())
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setAccuracies(data);
      });
  };
  useEffect(() => {
    if (!email) return;
    fetchAccuracy();
  }, [email]);
  const transcriptRender = (str: string) => {
    const formattedStr = str;
    let questions = formattedStr
      .split("<br>")
      .filter((el) => el)
      .map((el) =>
        el
          .replace(/\([^()]*\)/g, "")
          .replace(/\s+/g, " ")
          .trim()
      );
    //part 2
    //  questions = formattedStr.split(/\([^)]*\)/).filter(Boolean);
    return questions.map((child, index) => {
      return (
        <Item
          ref={(el) => (formRefs.current[index] = el as any)}
          key={index}
          keyValue={index}
          showHint={showHint}
          rerandom={rerandom}
          child={child}
          isShow={isShow}
        />
      );
    });
  };
  const render = (data: any) => {
    return (
      <div key={data.id} className="min-h-[500px] flex-1">
        {data.audiourl && <Waveform url={data.audiourl} />}
        <div className="flex items-start justify-center flex-col">
          <div className="flex gap-4 items-center justify-start my-4 flex-wrap">
            <div className="flex items-center justify-center gap-1">
              {showHint.isShow && (
                <Tooltip placement="topLeft" title="increase blanks">
                  <Button
                    style={{ backgroundColor: colorPrimary }}
                    className="!rounded-tr-none !rounded-br-none "
                    icon={
                      <CaretUpOutlined
                        onClick={() => {
                          setShowHint({ ...showHint, num: showHint.num + 1 });
                        }}
                      />
                    }
                  />
                </Tooltip>
              )}
              <Tooltip placement="top" title="Hide/Show hint">
                <Switch
                  id="showHintId"
                  className={clsx("!h-[30px]", {
                    "!rounded-none": showHint.isShow,
                  })}
                  onChange={(e) =>
                    setShowHint((prev) => ({
                      ...prev,
                      isShow: e,
                    }))
                  }
                  checkedChildren={`Show ${showHint.num} blank`}
                  unCheckedChildren="Hide hint"
                  checked={showHint.isShow}
                />
              </Tooltip>

              {showHint.isShow && (
                <Tooltip placement="topLeft" title="increase blanks">
                  <Button
                    style={{ backgroundColor: colorPrimary }}
                    className="!rounded-tl-none !rounded-bl-none "
                    onClick={() =>
                      setShowHint({
                        ...showHint,
                        num: showHint.num - 1 > -1 ? showHint.num - 1 : 0,
                      })
                    }
                    icon={<CaretDownOutlined />}
                  />
                </Tooltip>
              )}
            </div>
            <Tooltip placement="top" title="Show/Hide the answer">
              <Button
                icon={isShow ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => setIsShow(!isShow)}
                {...(isShow && {
                  type: "primary",
                })}
              >
                Show answer
              </Button>
            </Tooltip>

            <Badge count={rerandom}>
              {/* <Avatar shape="square" size="large" /> */}
              <Tooltip placement="top" title="Rerandom the blank">
                <Button
                  icon={<RedoOutlined />}
                  onClick={() => setRerandom((prev) => prev + 1)}
                  {...(rerandom > 0 && {
                    type: "primary",
                  })}
                >
                  Rerandom
                </Button>
              </Tooltip>
            </Badge>
          </div>
          <div className="">{data.questionnumber}</div>
          <div className="ml-8">{transcriptRender(data.transcript)}</div>
        </div>
        <Button
          className="ml-8 !sticky !bottom-4"
          type="primary"
          onClick={() => handleSubmit({ questionId: data.id })}
        >
          Submit
        </Button>
        {/* <div>{data.transcript}</div> */}
      </div>
    );
  };
  return (
    <>
      {/* <Pagination
        className="w-full flex items-center justify-center"
        responsive
        total={data.length}
        current={num}
        onChange={(e) => {
          setNum(e);
        }}
        pageSize={1}
      /> */}
      <div className="flex items-start justify-center gap-8">
        {data[num - 1] && render(data[num - 1])}
        <div className="w-60 flex items-start justify-end gap-1 flex-wrap mx-auto mt-10 sticky top-20 z-50 bg-white">
          {data.map((el, index) => {
            const accuracyNum = accuracies.find(
              (accu) => accu.questionid == (el.id as any)
            )?.accuracy;
            let percent = accuracyNum ? accuracyNum : 0;
            // percent = 99
            let color = "#9cad94";
            if (percent < 50 && percent > 0) {
              color = "red";
            } else if (percent >= 50 && percent < 100) {
              color = "orange";
            } else if (percent === 100) {
              color = "green";
            }

            return (
              /*
              <Button
                onClick={() => {
                  setNum(index+1)
                }}
                className={clsx('rounded-full overflow-hidden', {
                  '!border-[#1a8c16]': index+ 1 === num
                })} 
                icon={
                  <Progress
                    className="[&>.ant-progress-inner]:!w-10 [&>.ant-progress-inner]:!h-10 [&>.ant-progress-inner]:!text-sm"
                    type="circle"
                    percent={percent}
                    format={() => el.questionnumber}
                    status={"normal"}
                    strokeColor={color}
                    size={"small"}
                  />
                }
              ></Button>
              */
              <Tooltip
                key={el.questionnumber}
                placement="topLeft"
                title={"correct: " + percent + "%"}
              >
                <div
                  onClick={() => {
                    setNum(index + 1);
                  }}
                >
                  <Progress
                    className={clsx(
                      "cursor-pointer [&>.ant-progress-inner]:!w-10 [&>.ant-progress-inner]:!h-10 [&>.ant-progress-inner]:!text-sm",
                      {
                        "[&>.ant-progress-inner]:!bg-[#d5e52a]":
                          index + 1 === num,
                        "[&>.ant-progress-text]:!text-white": index + 1 === num,
                      }
                    )}
                    type="circle"
                    percent={percent}
                    format={() => el.questionnumber}
                    status={"normal"}
                    strokeColor={color}
                    size={"small"}
                  />
                </div>
              </Tooltip>

              // <Button>{el.questionnumber}</Button>
            );
          })}
        </div>
      </div>
      {contextHolder}
    </>
  );
};
