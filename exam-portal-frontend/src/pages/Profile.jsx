import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import "../assets/styles/dashboard.css";

import {
  getUserProfile,
  updateUserProfile,
} from "../services/profileService";

const Profile = () => {
  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const userId =
    storedUser.userId || storedUser.id;

  const role =
    storedUser.role || "USER";

  const isAdmin =
    role === "ADMIN";

  const [profile, setProfile] = useState({
    firstName: storedUser.firstName || "",
    lastName: storedUser.lastName || "",
    username: storedUser.username || "",
    phoneNumber: storedUser.phoneNumber || "",
    isActive: true,
  });

  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  // LOAD PROFILE FROM DATABASE
  const loadProfile = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response =
        await getUserProfile(userId);

      setProfile(response.data);

      setEditData({
        firstName:
          response.data.firstName || "",
        lastName:
          response.data.lastName || "",
        phoneNumber:
          response.data.phoneNumber || "",
      });

    } catch (error) {
      console.log(
        "Error loading profile:",
        error
      );

      alert("Failed to Load Profile");

    } finally {
      setLoading(false);
    }
  };

  // START EDITING
  const handleEdit = () => {
    setEditData({
      firstName:
        profile.firstName || "",
      lastName:
        profile.lastName || "",
      phoneNumber:
        profile.phoneNumber || "",
    });

    setEditing(true);
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE PROFILE
  const handleSave = async (e) => {
    e.preventDefault();

    if (!editData.firstName.trim()) {
      alert("First Name is required");
      return;
    }

    if (!editData.lastName.trim()) {
      alert("Last Name is required");
      return;
    }

    if (!editData.phoneNumber.trim()) {
      alert("Phone Number is required");
      return;
    }

    try {
      setSaving(true);

      const response =
        await updateUserProfile(
          userId,
          editData
        );

      const updatedProfile =
        response.data;

      setProfile(updatedProfile);

      // UPDATE LOCAL STORAGE
      const updatedStoredUser = {
        ...storedUser,
        firstName:
          updatedProfile.firstName,
        lastName:
          updatedProfile.lastName,
        phoneNumber:
          updatedProfile.phoneNumber,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedStoredUser
        )
      );

      setEditing(false);

      alert(
        "Profile Updated Successfully!"
      );

      // Refresh so DashboardLayout
      // immediately displays new name
      window.location.reload();

    } catch (error) {
      console.log(
        "Profile Update Error:",
        error
      );

      alert(
        "Failed to Update Profile"
      );

    } finally {
      setSaving(false);
    }
  };

  const fullName =
    `${profile.firstName || ""} ${
      profile.lastName || ""
    }`.trim() ||
    profile.username ||
    "User";

  const initial =
    profile.firstName
      ? profile.firstName
          .charAt(0)
          .toUpperCase()
      : profile.username
      ? profile.username
          .charAt(0)
          .toUpperCase()
      : "U";

  return (
    <DashboardLayout role={role}>

      <div className="dashboard-content">

        <h1>👤 My Profile</h1>

        <p>
          View and manage your personal
          account information.
        </p>

        {loading ? (

          <div className="card">
            <p>Loading profile...</p>
          </div>

        ) : (

          <div
            className="card"
            style={{
              maxWidth: "750px",
              margin: "30px auto",
            }}
          >

            {/* PROFILE HEADER */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                paddingBottom: "25px",
                borderBottom:
                  "1px solid #e6ecf5",
              }}
            >

              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #123f7a, #2878c7)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "42px",
                  fontWeight: "bold",
                }}
              >
                {initial}
              </div>

              <div>

                <h2>
                  {fullName}
                </h2>

                <p>
                  {isAdmin
                    ? "Administrator"
                    : "Student"}
                </p>

              </div>

            </div>

            {/* EDIT FORM */}

            {editing ? (

              <form
                onSubmit={handleSave}
                style={{
                  marginTop: "30px",
                }}
              >

                <h2>
                  ✏️ Edit Profile
                </h2>

                <p>
                  <strong>
                    First Name
                  </strong>
                </p>

                <input
                  type="text"
                  name="firstName"
                  value={
                    editData.firstName
                  }
                  onChange={handleChange}
                  required
                />

                <br />
                <br />

                <p>
                  <strong>
                    Last Name
                  </strong>
                </p>

                <input
                  type="text"
                  name="lastName"
                  value={
                    editData.lastName
                  }
                  onChange={handleChange}
                  required
                />

                <br />
                <br />

                <p>
                  <strong>
                    Phone Number
                  </strong>
                </p>

                <input
                  type="text"
                  name="phoneNumber"
                  value={
                    editData.phoneNumber
                  }
                  onChange={handleChange}
                  required
                />

                <br />
                <br />

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                  }}
                >

                  <button
                    type="submit"
                    className="login-btn"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : "💾 Save Changes"}
                  </button>

                  <button
                    type="button"
                    className="login-btn"
                    onClick={() =>
                      setEditing(false)
                    }
                  >
                    ❌ Cancel
                  </button>

                </div>

              </form>

            ) : (

              /* PROFILE DETAILS */

              <div
                style={{
                  marginTop: "30px",
                }}
              >

                <h2>
                  Personal Information
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "25px",
                  }}
                >

                  <div>
                    <p>
                      <strong>
                        First Name
                      </strong>
                    </p>

                    <p>
                      {profile.firstName ||
                        "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>
                        Last Name
                      </strong>
                    </p>

                    <p>
                      {profile.lastName ||
                        "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>
                        Username
                      </strong>
                    </p>

                    <p>
                      {profile.username ||
                        "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>
                        Phone Number
                      </strong>
                    </p>

                    <p>
                      {profile.phoneNumber ||
                        "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>
                        Role
                      </strong>
                    </p>

                    <p>
                      {isAdmin
                        ? "Administrator"
                        : "Student"}
                    </p>
                  </div>

                  <div>
                    <p>
                      <strong>
                        Account Status
                      </strong>
                    </p>

                    <p>
                      {profile.isActive ===
                      false
                        ? "Inactive"
                        : "Active"}
                    </p>
                  </div>

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    flexWrap: "wrap",
                    marginTop: "30px",
                  }}
                >

                  <button
                    className="login-btn"
                    onClick={handleEdit}
                  >
                    ✏️ Edit Profile
                  </button>

                  <Link
                    to={
                      isAdmin
                        ? "/admin/dashboard"
                        : "/user/dashboard"
                    }
                  >
                    <button
                      className="login-btn"
                    >
                      ← Back to Dashboard
                    </button>
                  </Link>

                </div>

              </div>

            )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default Profile;