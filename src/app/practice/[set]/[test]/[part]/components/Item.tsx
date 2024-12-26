import { Form, FormInstance, Input } from "antd";
import { generateRandomArray } from "./QuestionItems";
import clsx from "clsx";
import { forwardRef, memo, useMemo } from "react";

const blankedNum = 4;
export type Ref = FormInstance;
interface IProps {
  child: any;
  isShow: boolean;
  rerandom: number;
  showHint: any;
  keyValue: any;
}
export const Item = memo(forwardRef<Ref, IProps>(
  ({ child, isShow, rerandom, showHint, keyValue }, ref) => {
    const isShowHint = showHint.isShow;
    const exceptionArr: number[] = [];
    const questionSplit = child ? child.split(" ") : [];
    questionSplit.forEach((el: any, index: number) => {
      let exceptionChars = isShowHint ? ["(", "\u2019"] : ["("]; // day so huu cach

      exceptionChars.forEach((char) => {
        if (el.includes(char)) {
          exceptionArr.push(index);
        }
      });
    });
    const blankedIndexArr = useMemo(() => {
      return generateRandomArray(
        exceptionArr,
        showHint.isShow ? showHint.num : questionSplit.length,
        0,
        questionSplit.length - 1
      );
    }, [rerandom, showHint]);

    return (
      <Form
        ref={ref}
        key={keyValue}
        className="flex gap-4 items-center justify-start !mb-4 flex-wrap"
      >
        {questionSplit.map((qus: any, index: number) =>
          blankedIndexArr.includes(index) ? (
            <div key={index}>
              <Form.Item
                rules={[
                  {
                    validator(rule, value: string, callback) {
                      if (
                        value
                          .replace(/[^a-zA-Z0-9]/g, "")
                          .toLowerCase()
                          .trim() !==
                          qus
                            .replace(/[^a-zA-Z0-9]/g, "")
                            .toLowerCase()
                            .trim() ||
                        !value
                      ) {
                        callback("");
                      } else {
                        callback();
                      }
                    },
                  },
                ]}
                key={qus.id}
                className="max-w-fit !mb-0"
                name={index+qus}
              >
                <Input
                  autoComplete="off"
                  variant="outlined"
                  placeholder="enter here"
                  className="!w-28 h-8"
                />
              </Form.Item>
              <div
                className={clsx(
                  "mt-2 pl-3 h-8 text-red-500 font-semibold text-lg",
                  {
                    invisible: !isShow,
                  }
                )}
              >
                {qus}
              </div>
            </div>
          ) : (
            <div key={index}>
              <div className="h-8">{qus}</div>
              <div
                className={clsx("mt-2 text-red-500 font-semibold text-lg", {
                  invisible: !isShow,
                })}
              >
                {qus}
              </div>
            </div>
          )
        )}
      </Form>
    );
  }
));
Item.displayName = 'Item'
