import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";
import DashboardLayout from "../../components/DashboardLayout";

import {
  getCodingProblems,
  runCode,
  evaluateCode,
} from "../../services/codingService";

const CodingExam = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const [language, setLanguage] = useState("Java");
  const [sourceCode, setSourceCode] = useState("");

  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    loadProblems();
  }, []);

  // LOAD CODING PROBLEMS
  const loadProblems = async () => {
    try {
      const response = await getCodingProblems();
      setProblems(response.data);
    } catch (error) {
      console.log(
        "Problem Loading Error:",
        error
      );

      alert(
        "Failed to Load Coding Problems"
      );
    }
  };

  // OPEN SELECTED PROBLEM
  const openProblem = (problem) => {
    setSelectedProblem(problem);
    setLanguage("Java");
    setSourceCode("");
    setCustomInput(
      problem.sampleInput || ""
    );
    setOutput("");
    setError("");
    setStatus("");
    setEvaluationResult(null);
  };

  // BACK TO PROBLEMS
  const backToProblems = () => {
    setSelectedProblem(null);
    setLanguage("Java");
    setSourceCode("");
    setCustomInput("");
    setOutput("");
    setError("");
    setStatus("");
    setEvaluationResult(null);
  };

  // RUN CODE
  const handleRunCode = async () => {
    if (!sourceCode.trim()) {
      alert(
        "Please write your code first"
      );
      return;
    }

    try {
      setRunning(true);

      setOutput("");
      setError("");
      setStatus("Running...");
      setEvaluationResult(null);

      const response =
        await runCode({
          sourceCode: sourceCode,
          language: language,
          input: customInput,
        });

      console.log(
        "Run Response:",
        response.data
      );

      setOutput(
        response.data.output || ""
      );

      setError(
        response.data.error || ""
      );

      setStatus(
        response.data.status ||
          "Completed"
      );

    } catch (error) {
      console.log(
        "Code Execution Error:",
        error
      );

      setStatus("ERROR");

      if (error.response) {
        setError(
          error.response.data?.error ||
            "Failed to execute code"
        );
      } else {
        setError(
          "Unable to connect to code execution server"
        );
      }

    } finally {
      setRunning(false);
    }
  };

  // SUBMIT AND AUTOMATICALLY EVALUATE CODE
  const handleSubmit = async () => {
    if (!sourceCode.trim()) {
      alert(
        "Please write your code before submitting"
      );
      return;
    }

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser) {
      alert("Please login again");
      return;
    }

    const userId =
      storedUser.userId ||
      storedUser.id;

    if (!userId) {
      alert(
        "User ID not found. Please login again."
      );
      return;
    }

    try {
      setSubmitting(true);

      const response =
        await evaluateCode({
          userId: userId,
          problemId:
            selectedProblem.problemId,
          language: language,
          sourceCode: sourceCode,
        });

      const result =
        response.data;

      setEvaluationResult(
        result
      );

      setStatus(
        `${result.status} | Test Cases: ${result.passedTestCases}/${result.totalTestCases} | Marks: ${result.marks}`
      );

      setError("");

    } catch (error) {
      console.log(
        "Evaluation Error:",
        error
      );

      alert(
        typeof error.response
          ?.data === "string"
          ? error.response.data
          : "Failed to evaluate code"
      );

    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // ACTUAL CODING EXAM
  // NO DASHBOARD / SIDEBAR HERE
  // ==========================================

  if (selectedProblem) {
    return (
      <div className="dashboard-content">

        <h1>
          💻 Coding Examination
        </h1>

        <p>
          Solve the programming problem,
          run your code and submit your
          solution for evaluation.
        </p>

        <div className="card">

          <h2>
            {selectedProblem.title}
          </h2>

          <p>
            <strong>
              Difficulty:
            </strong>{" "}
            {
              selectedProblem.difficulty
            }
          </p>

          <h3>
            Problem Statement
          </h3>

          <p>
            {
              selectedProblem.problemStatement
            }
          </p>

          <h3>
            Sample Input
          </h3>

          <pre>
            {
              selectedProblem.sampleInput
            }
          </pre>

          <h3>
            Sample Output
          </h3>

          <pre>
            {
              selectedProblem.sampleOutput
            }
          </pre>

          <hr />

          {/* LANGUAGE */}

          <h3>
            Programming Language
          </h3>

          <select
            value={language}
            onChange={(e) => {
              setLanguage(
                e.target.value
              );

              setOutput("");
              setError("");
              setStatus("");
              setEvaluationResult(
                null
              );
            }}
          >
            <option value="Java">
              Java
            </option>

            <option value="Python">
              Python
            </option>

            <option value="C++">
              C++
            </option>

            <option value="JavaScript">
              JavaScript
            </option>
          </select>

          <br />
          <br />

          {/* CODE EDITOR */}

          <h3>
            Code Editor
          </h3>

          <textarea
            value={sourceCode}
            onChange={(e) =>
              setSourceCode(
                e.target.value
              )
            }
            placeholder="Write your code here..."
            rows="18"
            style={{
              width: "100%",
              fontFamily:
                "Consolas, monospace",
              fontSize: "15px",
              padding: "15px",
              boxSizing:
                "border-box",
            }}
          />

          <br />
          <br />

          {/* CUSTOM INPUT */}

          <h3>
            Custom Input
          </h3>

          <textarea
            value={customInput}
            onChange={(e) =>
              setCustomInput(
                e.target.value
              )
            }
            placeholder="Enter input for your program"
            rows="4"
            style={{
              width: "100%",
              fontFamily:
                "Consolas, monospace",
              fontSize: "15px",
              padding: "15px",
              boxSizing:
                "border-box",
            }}
          />

          {/* ACTION BUTTONS */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              alignItems: "center",
              gap: "50px",
              marginTop: "35px",
              marginBottom:
                "35px",
              flexWrap: "wrap",
            }}
          >

            <button
              onClick={
                handleRunCode
              }
              disabled={running}
              style={{
                padding:
                  "15px 45px",
                minWidth:
                  "200px",
                backgroundColor:
                  "#2563eb",
                color: "white",
                border: "none",
                borderRadius:
                  "8px",
                fontSize:
                  "17px",
                fontWeight:
                  "600",
                cursor:
                  "pointer",
              }}
            >
              {running
                ? "Running..."
                : "▶ Run Code"}
            </button>

            <button
              onClick={
                handleSubmit
              }
              disabled={
                submitting
              }
              style={{
                padding:
                  "15px 45px",
                minWidth:
                  "200px",
                backgroundColor:
                  "#2563eb",
                color: "white",
                border: "none",
                borderRadius:
                  "8px",
                fontSize:
                  "17px",
                fontWeight:
                  "600",
                cursor:
                  "pointer",
              }}
            >
              {submitting
                ? "Evaluating..."
                : "✅ Submit Code"}
            </button>

            <button
              onClick={
                backToProblems
              }
              style={{
                padding:
                  "15px 45px",
                minWidth:
                  "200px",
                backgroundColor:
                  "#2563eb",
                color: "white",
                border: "none",
                borderRadius:
                  "8px",
                fontSize:
                  "17px",
                fontWeight:
                  "600",
                cursor:
                  "pointer",
              }}
            >
              ← Back to Problems
            </button>

          </div>

          {/* EXECUTION RESULT */}

          {(status ||
            output ||
            error) && (

            <div
              className="card"
              style={{
                marginTop:
                  "30px",
              }}
            >

              <h2>
                🖥 Execution Result
              </h2>

              {status && (
                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {status}
                </p>
              )}

              {output && (
                <>

                  <h3>
                    Output
                  </h3>

                  <pre
                    style={{
                      padding:
                        "15px",
                      whiteSpace:
                        "pre-wrap",
                    }}
                  >
                    {output}
                  </pre>

                </>
              )}

              {error && (
                <>

                  <h3>
                    Compiler /
                    Runtime Error
                  </h3>

                  <pre
                    style={{
                      padding:
                        "15px",
                      whiteSpace:
                        "pre-wrap",
                    }}
                  >
                    {error}
                  </pre>

                </>
              )}

            </div>

          )}

          {/* EVALUATION RESULT */}

          {evaluationResult && (

            <div
              className="card"
              style={{
                marginTop:
                  "35px",
                padding:
                  "35px",
                textAlign:
                  "center",
              }}
            >

              <h2>
                🏆 Coding Evaluation Result
              </h2>

              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                  gap: "70px",
                  flexWrap:
                    "wrap",
                  marginTop:
                    "30px",
                }}
              >

                <div>

                  <h3>
                    🧪 Test Cases
                  </h3>

                  <p
                    style={{
                      fontSize:
                        "24px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {
                      evaluationResult.passedTestCases
                    }
                    {" / "}
                    {
                      evaluationResult.totalTestCases
                    }
                  </p>

                </div>

                <div>

                  <h3>
                    🎯 Marks
                  </h3>

                  <p
                    style={{
                      fontSize:
                        "24px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {
                      evaluationResult.marks
                    }{" "}
                    / 100
                  </p>

                </div>

                <div>

                  <h3>
                    📊 Status
                  </h3>

                  <p
                    style={{
                      fontSize:
                        "24px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {
                      evaluationResult.status
                    }
                  </p>

                </div>

              </div>

              <div
                style={{
                  marginTop:
                    "30px",
                  fontSize:
                    "18px",
                  fontWeight:
                    "600",
                }}
              >

                {evaluationResult.status ===
                "PASSED"
                  ? "🎉 Excellent! All test cases passed successfully."
                  : evaluationResult.status ===
                    "PARTIALLY PASSED"
                  ? "💡 Some test cases passed. Review your code and try again."
                  : "❌ Test cases failed. Check your logic and try again."}

              </div>

            </div>

          )}

        </div>

      </div>
    );
  }

  // ==========================================
  // CODING PROBLEMS LIST
  // DASHBOARD LAYOUT SHOWN HERE
  // ==========================================

  return (
    <DashboardLayout role="USER">

      <div className="dashboard-content">

        <h1>
          💻 Coding Problems
        </h1>

        <p>
          Select a programming problem
          and start your coding examination.
        </p>

        {problems.length === 0 ? (

          <div className="card">

            <h2>
              No Coding Problems Available
            </h2>

          </div>

        ) : (

          <div className="cards">

            {problems.map(
              (problem) => (

                <div
                  className="card"
                  key={
                    problem.problemId
                  }
                >

                  <h2>
                    {problem.title}
                  </h2>

                  <p>
                    <strong>
                      Difficulty:
                    </strong>{" "}
                    {
                      problem.difficulty
                    }
                  </p>

                  <p>
                    {
                      problem.problemStatement
                    }
                  </p>

                  <button
                    className="login-btn"
                    onClick={() =>
                      openProblem(
                        problem
                      )
                    }
                  >
                    Solve Problem
                  </button>

                </div>

              )
            )}

          </div>

        )}

        <br />

        <Link to="/user/dashboard">

          <button className="login-btn">
            ← Back to Dashboard
          </button>

        </Link>

      </div>

    </DashboardLayout>
  );
};

export default CodingExam;