import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/dashboard.css";

import {
  getCodingProblems,
  addCodingProblem,
  updateCodingProblem,
  deleteCodingProblem,
  getTestCases,
  addTestCase,
  deleteTestCase,
} from "../../services/codingService";

const CodingProblems = () => {
  const emptyProblem = {
    title: "",
    problemStatement: "",
    sampleInput: "",
    sampleOutput: "",
    difficulty: "Easy",
  };

  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState(emptyProblem);

  const [editingProblemId, setEditingProblemId] = useState(null);

  const [selectedProblem, setSelectedProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);

  const [testCase, setTestCase] = useState({
    inputData: "",
    expectedOutput: "",
  });

  const [loadingTestCases, setLoadingTestCases] = useState(false);

  useEffect(() => {
    loadProblems();
  }, []);

  // LOAD PROBLEMS
  const loadProblems = async () => {
    try {
      const response = await getCodingProblems();
      setProblems(response.data);
    } catch (error) {
      console.log("Error loading problems:", error);
      alert("Failed to Load Coding Problems");
    }
  };

  // HANDLE PROBLEM FORM INPUT
  const handleChange = (e) => {
    setProblem({
      ...problem,
      [e.target.name]: e.target.value,
    });
  };

  // ADD OR UPDATE PROBLEM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProblemId) {
        await updateCodingProblem(
          editingProblemId,
          problem
        );

        alert("Coding Problem Updated Successfully!");
      } else {
        await addCodingProblem(problem);

        alert("Coding Problem Added Successfully!");
      }

      setProblem(emptyProblem);
      setEditingProblemId(null);

      await loadProblems();

    } catch (error) {
      console.log("Save Problem Error:", error);

      alert(
        editingProblemId
          ? "Failed to Update Coding Problem"
          : "Failed to Add Coding Problem"
      );
    }
  };

  // EDIT PROBLEM
  const handleEdit = (item) => {
    setEditingProblemId(item.problemId);

    setProblem({
      title: item.title || "",
      problemStatement: item.problemStatement || "",
      sampleInput: item.sampleInput || "",
      sampleOutput: item.sampleOutput || "",
      difficulty: item.difficulty || "Easy",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingProblemId(null);
    setProblem(emptyProblem);
  };

  // DELETE PROBLEM
  const handleDelete = async (problemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this coding problem?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteCodingProblem(problemId);

      alert("Coding Problem Deleted Successfully");

      if (
        selectedProblem &&
        selectedProblem.problemId === problemId
      ) {
        setSelectedProblem(null);
        setTestCases([]);
      }

      if (editingProblemId === problemId) {
        handleCancelEdit();
      }

      await loadProblems();

    } catch (error) {
      console.log("Delete Problem Error:", error);
      alert("Failed to Delete Problem");
    }
  };

  // OPEN TEST CASE MANAGER
  const handleManageTestCases = async (item) => {
    setSelectedProblem(item);

    setTestCase({
      inputData: "",
      expectedOutput: "",
    });

    await loadTestCases(item.problemId);
  };

  // LOAD TEST CASES
  const loadTestCases = async (problemId) => {
    try {
      setLoadingTestCases(true);

      const response =
        await getTestCases(problemId);

      setTestCases(response.data);

    } catch (error) {
      console.log(
        "Error loading test cases:",
        error
      );

      setTestCases([]);
      alert("Failed to Load Test Cases");

    } finally {
      setLoadingTestCases(false);
    }
  };

  // HANDLE TEST CASE FORM
  const handleTestCaseChange = (e) => {
    setTestCase({
      ...testCase,
      [e.target.name]: e.target.value,
    });
  };

  // ADD TEST CASE
  const handleAddTestCase = async (e) => {
    e.preventDefault();

    if (!selectedProblem) {
      alert("Please select a coding problem");
      return;
    }

    if (!testCase.inputData.trim()) {
      alert("Please enter test case input");
      return;
    }

    if (!testCase.expectedOutput.trim()) {
      alert("Please enter expected output");
      return;
    }

    try {
      await addTestCase({
        problemId: selectedProblem.problemId,
        inputData: testCase.inputData,
        expectedOutput: testCase.expectedOutput,
      });

      alert("Test Case Added Successfully!");

      setTestCase({
        inputData: "",
        expectedOutput: "",
      });

      await loadTestCases(
        selectedProblem.problemId
      );

    } catch (error) {
      console.log(
        "Error adding test case:",
        error
      );

      alert("Failed to Add Test Case");
    }
  };

  // DELETE TEST CASE
  const handleDeleteTestCase = async (
    testCaseId
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test case?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteTestCase(testCaseId);

      alert("Test Case Deleted Successfully");

      await loadTestCases(
        selectedProblem.problemId
      );

    } catch (error) {
      console.log(
        "Error deleting test case:",
        error
      );

      alert("Failed to Delete Test Case");
    }
  };

  return (
    <div className="dashboard-content">

      <h1>💻 Coding Problems</h1>

      <p>
        Create and manage programming questions and
        test cases for coding examinations.
      </p>

      {/* ADD / EDIT PROBLEM */}

      <div className="card">

        <h2>
          {editingProblemId
            ? "✏️ Edit Coding Problem"
            : "➕ Add Coding Problem"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Problem Title"
            value={problem.title}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <textarea
            name="problemStatement"
            placeholder="Enter Problem Statement"
            value={problem.problemStatement}
            onChange={handleChange}
            rows="5"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
            }}
          />

          <br />
          <br />

          <input
            type="text"
            name="sampleInput"
            placeholder="Sample Input"
            value={problem.sampleInput}
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="text"
            name="sampleOutput"
            placeholder="Sample Output"
            value={problem.sampleOutput}
            onChange={handleChange}
          />

          <br />
          <br />

          <select
            name="difficulty"
            value={problem.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>
          </select>

          <br />
          <br />

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >

            <button
              type="submit"
              className="login-btn"
            >
              {editingProblemId
                ? "💾 Update Coding Problem"
                : "➕ Add Coding Problem"}
            </button>

            {editingProblemId && (

              <button
                type="button"
                className="login-btn"
                onClick={handleCancelEdit}
              >
                ❌ Cancel Edit
              </button>

            )}

          </div>

        </form>

      </div>

      <br />

      {/* AVAILABLE PROBLEMS */}

      <h2>📚 Available Coding Problems</h2>

      <div className="cards">

        {problems.length === 0 ? (

          <div className="card">
            <h3>
              No Coding Problems Available
            </h3>
          </div>

        ) : (

          problems.map((item) => (

            <div
              className="card"
              key={item.problemId}
            >

              <h2>{item.title}</h2>

              <p>
                <strong>Difficulty:</strong>{" "}
                {item.difficulty}
              </p>

              <p>
                {item.problemStatement}
              </p>

              <p>
                <strong>Sample Input:</strong>{" "}
                {item.sampleInput}
              </p>

              <p>
                <strong>Sample Output:</strong>{" "}
                {item.sampleOutput}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >

                <button
                  className="login-btn"
                  onClick={() =>
                    handleEdit(item)
                  }
                >
                  ✏️ Edit Problem
                </button>

                <button
                  className="login-btn"
                  onClick={() =>
                    handleManageTestCases(item)
                  }
                >
                  🧪 Manage Test Cases
                </button>

                <button
                  className="login-btn"
                  onClick={() =>
                    handleDelete(
                      item.problemId
                    )
                  }
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* TEST CASE MANAGEMENT */}

      {selectedProblem && (

        <>

          <br />

          <div className="card">

            <h2>
              🧪 Manage Test Cases
            </h2>

            <h3>
              Problem: {selectedProblem.title}
            </h3>

            <p>
              Add input and expected output used
              for automatic code evaluation.
            </p>

            <form
              onSubmit={handleAddTestCase}
            >

              <h3>Test Case Input</h3>

              <textarea
                name="inputData"
                placeholder="Example: 5 10"
                value={testCase.inputData}
                onChange={
                  handleTestCaseChange
                }
                rows="4"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
              />

              <br />
              <br />

              <h3>Expected Output</h3>

              <textarea
                name="expectedOutput"
                placeholder="Example: 15"
                value={
                  testCase.expectedOutput
                }
                onChange={
                  handleTestCaseChange
                }
                rows="4"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                }}
                required
              />

              <br />
              <br />

              <button
                type="submit"
                className="login-btn"
              >
                ➕ Add Test Case
              </button>

            </form>

            <br />

            <h2>Existing Test Cases</h2>

            {loadingTestCases ? (

              <p>
                Loading test cases...
              </p>

            ) : testCases.length === 0 ? (

              <p>
                No test cases added yet.
              </p>

            ) : (

              <div className="cards">

                {testCases.map(
                  (item, index) => (

                    <div
                      className="card"
                      key={
                        item.testCaseId
                      }
                    >

                      <h3>
                        Test Case {index + 1}
                      </h3>

                      <p>
                        <strong>Input:</strong>
                      </p>

                      <pre>
                        {item.inputData}
                      </pre>

                      <p>
                        <strong>
                          Expected Output:
                        </strong>
                      </p>

                      <pre>
                        {item.expectedOutput}
                      </pre>

                      <button
                        className="login-btn"
                        onClick={() =>
                          handleDeleteTestCase(
                            item.testCaseId
                          )
                        }
                      >
                        🗑️ Delete Test Case
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

            <br />

            <button
              className="login-btn"
              onClick={() => {
                setSelectedProblem(null);
                setTestCases([]);
              }}
            >
              Close Test Case Manager
            </button>

          </div>

        </>

      )}

      <br />

      <Link to="/admin/dashboard">

        <button className="login-btn">
          ← Back to Dashboard
        </button>

      </Link>

    </div>
  );
};

export default CodingProblems;