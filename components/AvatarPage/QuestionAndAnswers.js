import { Button, TextArea } from "@creativehub/marketrix-ui";
import { on } from "events";
import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

const QuestionAndAnswers = ({
  onAdd,
  questionAndAnswers,
  edit,
  avatarName,
  avatarStatus,
}) => {
  const [formDataList, setFormDataList] = useState([{ id: "1", q: "", a: "" }]);

  const [show, setShow] = useState(false);
  const [modify, setModify] = useState(false);
  const handleChange = (id, field, value) => {
    // console.log(id, field, value);

    if (value.length > 0) {
      setFormDataList((prevList) => {
        const newList = [...prevList];
        const index = newList.findIndex((item) => item.id === id);
        if (index !== -1) {
          newList[index][field] = value;
        }
        console.log(newList);
        onAdd(newList);
        return newList;
      });
    }
  };

  const handleAdd = () => {
    const newId = (formDataList.length + 1).toString(); // Generate a unique ID
    setFormDataList((prevList) => [...prevList, { id: newId, q: "", a: "" }]);
  };

  const handleRemove = (id) => {
    console.log("id", id);
    const newList = formDataList.filter((item) => item.id !== id);
    setFormDataList(newList);
    onAdd(newList);
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const toggleModify = () => {
    if (!modify) {
      setShow(true);
    }
    setModify(!modify);
  };

  useEffect(() => {
    console.log("Edit___", edit);
    console.log("questionAndAnswers", questionAndAnswers);

    if (edit && questionAndAnswers) {
      setFormDataList(questionAndAnswers);
    }
  }, [edit]);

  return (
    <div>
      {edit ? (
        <>
          {" "}
          <div className=" flex items-center">
            <div className="text-[#1D2939] text-[16px] font-bold">
              Unleash Intelligence: {avatarName}&apos;s Unique Q&A
            </div>

            <Button
              alignItems="center"
              borderColor="#F2F4F7"
              borderRadius="8px"
              color="#667085"
              direction="row"
              disabledColor="#F2F4F7"
              display="flex"
              flexDirection="row"
              fontSize="14px"
              gap="8px"
              icon="chevDown"
              iconPosition="trailing"
              justifyContent="center"
              label=""
              size="sm"
              onClick={toggleShow}
            />
            {avatarStatus === "succeeded" && (
              <>
                <Button
                  alignItems="center"
                  borderColor="#F2F4F7"
                  borderRadius="8px"
                  color="#667085"
                  direction="row"
                  disabledColor="#F2F4F7"
                  display="flex"
                  flexDirection="row"
                  fontSize="14px"
                  gap="8px"
                  icon={modify ? "rocket" : "edit"}
                  iconSize={"16px"}
                  iconPosition="trailing"
                  justifyContent="center"
                  label={modify ? "Done" : "Modify"}
                  size="sm"
                  onClick={toggleModify}
                />
              </>
            )}
          </div>
          {show && (
            <>
              {modify ? (
                <>
                  <div className="mt-2 ">
                    {formDataList.map((formData) => (
                      <div key={formData.id}>
                        <div className="grid gap-6  md:grid-cols-2 pt-3 pb-3  ">
                          <div>
                            <label className="block mb-2 text-sm text-[#667085] font-medium  ">
                              Question
                            </label>
                            <input
                              type="text"
                              id="question"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow  w-full p-2.5  focus:outline-none"
                              placeholder="Type your question.."
                              required
                              value={formData.q}
                              onChange={(e) =>
                                handleChange(formData.id, "q", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium text-[#667085] ">
                              Answer
                            </label>
                            <input
                              type="text"
                              id="answer"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow  w-full p-2.5  focus:outline-none"
                              placeholder="Type your answer.."
                              required
                              value={formData.a}
                              onChange={(e) =>
                                handleChange(formData.id, "a", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {formData.id !== "1" && (
                          <>
                            <button onClick={() => handleRemove(formData.id)}>
                              <div className=" flex gap-2 items-center text-[14px] text-[#7F56D9] font-semibold">
                                <div>
                                  <FiX />
                                </div>
                                <div>Remove Question</div>
                              </div>
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                    <br />
                    <button onClick={handleAdd}>
                      <div className=" flex gap-2 items-center text-[14px] text-[#7F56D9] font-semibold">
                        <div>
                          <FiPlus />
                        </div>
                        <div>Add another Question</div>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-2 ">
                    {formDataList.map((formData) => (
                      <div
                        key={formData.id}
                        className="border rounded-lg p-1 px-6 mb-3"
                      >
                        <div className="mb-2">
                          <span className="text-gray-700 font-semibold">
                            Q:
                          </span>{" "}
                          {formData.q}
                        </div>
                        <div>
                          <span className="text-gray-700 font-semibold">
                            A:
                          </span>{" "}
                          {formData.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className=" text-[#1D2939] text-[16px] font-bold">
            Enhance Your AI&apos;s Knowledge: Custom Questions & Answers for{" "}
            {avatarName}
          </div>
          <div className="text-[#667085] text-[14px] !font-normal py-4">
            Elevate the intelligence of your AI companion by contributing your
            <span className="font-bold"> unique questions and answers</span>.
            Let&apos;s tailor its knowledge to better serve your needs.
          </div>

          {formDataList.map((formData) => (
            <div key={formData.id}>
              <div className="grid gap-6  md:grid-cols-2 pt-3 pb-3  ">
                <div>
                  <label className="block mb-2 text-sm text-[#667085] font-medium  ">
                    Question
                  </label>
                  <input
                    type="text"
                    id="question"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow  w-full p-2.5  focus:outline-none"
                    placeholder="Type your question.."
                    required
                    value={formData.q}
                    onChange={(e) =>
                      handleChange(formData.id, "q", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#667085] ">
                    Answer
                  </label>
                  <input
                    type="text"
                    id="answer"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow  w-full p-2.5  focus:outline-none"
                    placeholder="Type your answer.."
                    required
                    value={formData.a}
                    onChange={(e) =>
                      handleChange(formData.id, "a", e.target.value)
                    }
                  />
                </div>
              </div>

              {formData.id !== "1" && (
                <>
                  <button onClick={() => handleRemove(formData.id)}>
                    <div className=" flex gap-2 items-center text-[14px] text-[#7F56D9] font-semibold">
                      <div>
                        <FiX />
                      </div>
                      <div>Remove Question</div>
                    </div>
                  </button>
                </>
              )}
            </div>
          ))}
          <br />
          <button onClick={handleAdd}>
            <div className=" flex gap-2 items-center text-[14px] text-[#7F56D9] font-semibold">
              <div>
                <FiPlus />
              </div>
              <div>Add another Question</div>
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default QuestionAndAnswers;
