import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ImagePlus,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  Plus,
  Quote,
  Radio,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";
import BrandLoader from "../../components/BrandLoader";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import heroPortrait from "../../assets/me/hero.jpeg";
import API_URL from "./config";
import {
  clearAdminSession,
  getAdminAuthHeaders,
  getAdminToken,
  persistAdminSession,
} from "../../utils/adminAuth";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

const initialProjectForm = {
  title: "",
  description: "",
  liveUrl: "",
};

const initialReviewForm = {
  authorName: "",
  authorRole: "",
  content: "",
  visibility: "public",
  isPublished: true,
};

const formatDateTime = (value) => {
  if (!value) {
    return "Unknown time";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const Admin = () => {
  const [adminToken, setAdminToken] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [projectSetupNotice, setProjectSetupNotice] = useState("");
  const [reviewSetupNotice, setReviewSetupNotice] = useState("");
  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [reviewForm, setReviewForm] = useState(initialReviewForm);
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [projectImagePreview, setProjectImagePreview] = useState("");
  const [projectImageInputKey, setProjectImageInputKey] = useState(0);
  const [projectError, setProjectError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [isUploadingProjectImage, setIsUploadingProjectImage] = useState(false);
  const [isPublishingProject, setIsPublishingProject] = useState(false);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [activeReviewId, setActiveReviewId] = useState(null);

  const adminHeaders = useMemo(
    () => ({
      headers: {
        "Content-Type": "application/json",
        ...getAdminAuthHeaders(adminToken),
      },
    }),
    [adminToken]
  );

  const loadDashboard = async (tokenToUse) => {
    setIsLoadingDashboard(true);
    setDashboardError("");

    try {
      const requestConfig = {
        headers: getAdminAuthHeaders(tokenToUse),
      };
      const [submissionsResponse, projectsResponse, reviewsResponse] = await Promise.all([
        axios.get(`${API_URL}/api/admin/submissions?limit=80`, requestConfig),
        axios.get(`${API_URL}/api/admin/projects`, requestConfig),
        axios.get(`${API_URL}/api/admin/reviews`, requestConfig),
      ]);

      setSubmissions(submissionsResponse.data?.submissions ?? []);
      setCurrentProjects(projectsResponse.data?.projects ?? []);
      setReviews(reviewsResponse.data?.reviews ?? []);
      setProjectSetupNotice(projectsResponse.data?.setupMessage || "");
      setReviewSetupNotice(reviewsResponse.data?.setupMessage || "");
      setAdminToken(tokenToUse);
      setAuthError("");
    } catch (error) {
      if (error.response?.status === 401) {
        clearAdminSession();
        setAdminToken("");
        setDashboardError("");
        setProjectSetupNotice("");
        setReviewSetupNotice("");
        setAuthError(error.response?.data?.error || "Your admin session expired.");
      } else {
        setDashboardError(
          error.response?.data?.error ||
            "The admin dashboard could not load right now."
        );
      }
    } finally {
      setIsLoadingDashboard(false);
      setIsBootstrapping(false);
    }
  };

  useEffect(() => {
    const storedToken = getAdminToken();

    if (!storedToken) {
      setIsBootstrapping(false);
      return;
    }

    loadDashboard(storedToken);
  }, []);

  useEffect(() => {
    if (!projectImageFile) {
      setProjectImagePreview("");
      return undefined;
    }

    const nextPreviewUrl = URL.createObjectURL(projectImageFile);
    setProjectImagePreview(nextPreviewUrl);

    return () => {
      URL.revokeObjectURL(nextPreviewUrl);
    };
  }, [projectImageFile]);

  const handleCredentialsChange = (event) => {
    const { name, value } = event.target;
    setCredentials((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    setAuthError("");

    try {
      const response = await axios.post(`${API_URL}/api/admin/session`, {
        username: credentials.username,
        password: credentials.password,
      });
      const nextToken = response.data?.token || "";

      if (!nextToken) {
        throw new Error("Missing admin session token.");
      }

      persistAdminSession(nextToken, response.data?.admin || null);
      await loadDashboard(nextToken);
    } catch (error) {
      clearAdminSession();
      setAdminToken("");
      setProjectSetupNotice("");
      setReviewSetupNotice("");
      setAuthError(
        error.response?.status === 401
          ? "Incorrect admin username or password."
          : error.response?.data?.error ||
              "Admin sign-in failed. Check the API connection and try again."
      );
    } finally {
      setIsAuthenticating(false);
      setIsBootstrapping(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setAdminToken("");
    setSubmissions([]);
    setCurrentProjects([]);
    setReviews([]);
    setProjectSetupNotice("");
    setReviewSetupNotice("");
    setProjectImageFile(null);
    setProjectImagePreview("");
    setProjectImageInputKey((currentValue) => currentValue + 1);
    setProjectForm(initialProjectForm);
    setReviewForm(initialReviewForm);
    setCredentials({ username: "", password: "" });
    setDashboardError("");
    setAuthError("");
    setProjectError("");
    setReviewError("");
    setActiveReviewId(null);
  };

  const handleProjectFormChange = (event) => {
    const { name, value } = event.target;
    setProjectForm((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const handleProjectImageChange = (event) => {
    const nextFile = event.target.files?.[0] || null;
    setProjectImageFile(nextFile);
  };

  const handleReviewFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setReviewForm((currentValue) => ({
      ...currentValue,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    setProjectError("");

    if (projectSetupNotice) {
      setProjectError(projectSetupNotice);
      return;
    }

    if (!projectImageFile) {
      setProjectError("Please choose a project image to upload.");
      return;
    }

    setIsPublishingProject(true);
    setIsUploadingProjectImage(true);

    try {
      const uploadPayload = new FormData();
      uploadPayload.set("image", projectImageFile);

      const uploadResponse = await axios.post(
        `${API_URL}/api/admin/uploads/project-image`,
        uploadPayload,
        {
          headers: getAdminAuthHeaders(adminToken),
        }
      );
      const imageUrl = uploadResponse.data?.imageUrl || "";

      if (!imageUrl) {
        throw new Error("Project image upload did not return an image URL.");
      }

      setIsUploadingProjectImage(false);
      const response = await axios.post(
        `${API_URL}/api/admin/projects`,
        {
          ...projectForm,
          imageUrl,
        },
        adminHeaders
      );
      const nextProject = response.data?.project;

      if (nextProject) {
        setCurrentProjects((currentValue) => [nextProject, ...currentValue]);
      }

      setProjectForm(initialProjectForm);
      setProjectImageFile(null);
      setProjectImageInputKey((currentValue) => currentValue + 1);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
        setAuthError("Your admin session expired. Please sign in again.");
      } else if (error.response?.data?.error) {
        setProjectError(error.response.data.error);
      } else {
        setProjectError(
          error instanceof Error
            ? error.message
            : "The current project could not be published right now."
        );
      }
    } finally {
      setIsUploadingProjectImage(false);
      setIsPublishingProject(false);
    }
  };

  const reloadDashboard = async () => {
    if (!adminToken) {
      return;
    }

    await loadDashboard(adminToken);
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setReviewError("");

    if (reviewSetupNotice) {
      setReviewError(reviewSetupNotice);
      return;
    }

    setIsSavingReview(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/admin/reviews`,
        reviewForm,
        adminHeaders
      );
      const nextReview = response.data?.review;

      if (nextReview) {
        setReviews((currentValue) => [nextReview, ...currentValue]);
      }

      setReviewForm(initialReviewForm);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
        setAuthError("Your admin session expired. Please sign in again.");
      } else if (error.response?.data?.error) {
        setReviewError(error.response.data.error);
      } else {
        setReviewError(
          error instanceof Error
            ? error.message
            : "The review could not be saved right now."
        );
      }
    } finally {
      setIsSavingReview(false);
    }
  };

  const handleReviewUpdate = async (reviewId, updatePayload) => {
    setReviewError("");
    setActiveReviewId(reviewId);

    try {
      const response = await axios.patch(
        `${API_URL}/api/admin/reviews/${reviewId}`,
        updatePayload,
        adminHeaders
      );
      const nextReview = response.data?.review;

      if (nextReview) {
        setReviews((currentValue) =>
          currentValue.map((review) =>
            review.id === reviewId ? nextReview : review
          )
        );
      }
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
        setAuthError("Your admin session expired. Please sign in again.");
      } else if (error.response?.data?.error) {
        setReviewError(error.response.data.error);
      } else {
        setReviewError("The review status could not be updated right now.");
      }
    } finally {
      setActiveReviewId(null);
    }
  };

  return (
    <div className="theme-page overflow-x-hidden">
      <Navbar />
      <PageHero
        eyebrow="Admin"
        title="Control Room"
        description="Monitor new client conversations, keep contact details close, and publish what is actively being built so the portfolio always reflects current work."
        image={heroPortrait}
      >
        {adminToken ? (
          <button
            type="button"
            className="theme-button-secondary px-6 py-3"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Log Out
          </button>
        ) : (
          <span className="theme-chip">Secure Login Required</span>
        )}
      </PageHero>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {isBootstrapping ? (
          <BrandLoader
            label="Loading admin session"
            compact
            className="max-w-xl mx-auto"
          />
        ) : !adminToken ? (
          <motion.div
            className="admin-login-shell mx-auto max-w-xl"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <div className="glass-card admin-login-card">
              <div className="admin-login-badge">
                <LockKeyhole size={18} />
                <span>Secure Admin Login</span>
              </div>
              <h2 className="gradient-text text-3xl font-bold mt-6">
                Sign in to manage live work
              </h2>
              <p className="theme-muted mt-4">
                This admin session protects project publishing and the client
                conversation feed.
              </p>
              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <label className="block">
                  <span className="theme-muted text-sm font-semibold">Username</span>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleCredentialsChange}
                    className="theme-form-input mt-2 block w-full rounded-full p-3"
                    autoComplete="username"
                    required
                  />
                </label>
                <label className="block">
                  <span className="theme-muted text-sm font-semibold">Password</span>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleCredentialsChange}
                    className="theme-form-input mt-2 block w-full rounded-full p-3"
                    autoComplete="current-password"
                    required
                  />
                </label>
                {authError ? (
                  <p className="admin-status-error">{authError}</p>
                ) : null}
                <button
                  type="submit"
                  className="theme-button-primary px-6 py-3 w-full justify-center"
                  disabled={isAuthenticating || isBootstrapping}
                >
                  {isAuthenticating ? (
                    <>
                      <BrandLoader inline />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      Unlock Admin
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="admin-dashboard-grid brand-loader-overlay-shell"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {isLoadingDashboard ? (
              <div className="brand-loader-overlay">
                <BrandLoader label="Refreshing dashboard" compact />
              </div>
            ) : null}
            <div className="space-y-6">
              <div className="glass-card admin-section-card">
                <div className="admin-section-header">
                  <div>
                    <span className="admin-section-eyebrow">
                      <Mail size={14} />
                      Conversation Feed
                    </span>
                    <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--text-primary)" }}>
                      Client submissions with contact details
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="theme-button-secondary px-5 py-3"
                    onClick={reloadDashboard}
                    disabled={isLoadingDashboard}
                  >
                    {isLoadingDashboard ? (
                      <>
                        <BrandLoader inline />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCcw size={16} />
                        Refresh
                      </>
                    )}
                  </button>
                </div>
                {dashboardError ? (
                  <p className="admin-status-error mt-4">{dashboardError}</p>
                ) : null}
                <div className="admin-chat-thread">
                  {submissions.length ? (
                    submissions.map((submission) => (
                      <article key={submission.id} className="admin-chat-card">
                        <div className="admin-chat-card-top">
                          <div>
                            <h3 className="admin-chat-name">{submission.name}</h3>
                            <p className="admin-chat-subject">{submission.subject}</p>
                          </div>
                          <span className="admin-chat-time">
                            {formatDateTime(submission.created_at)}
                          </span>
                        </div>
                        <div className="admin-chat-meta">
                          <a href={`mailto:${submission.email}`}>{submission.email}</a>
                          {submission.phone ? (
                            <a href={`tel:${submission.phone}`}>
                              <Phone size={14} />
                              {submission.phone}
                            </a>
                          ) : null}
                        </div>
                        <p className="admin-chat-message">{submission.message}</p>
                      </article>
                    ))
                  ) : (
                    <div className="admin-empty-card">
                      <p>No submissions yet. New contact form messages will show here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card admin-section-card admin-sticky-panel">
                <div className="admin-section-header admin-section-header--stacked">
                  <div>
                    <span className="admin-section-eyebrow">
                      <Plus size={14} />
                      Publish Current Work
                    </span>
                    <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--text-primary)" }}>
                      Add a live in-progress project
                    </h2>
                  </div>
                </div>
                <form onSubmit={handleProjectSubmit} className="space-y-4 mt-6">
                  {projectSetupNotice ? (
                    <p className="theme-muted">{projectSetupNotice}</p>
                  ) : null}
                  <label className="block">
                    <span className="theme-muted text-sm font-semibold">Project title</span>
                    <input
                      type="text"
                      name="title"
                      value={projectForm.title}
                      onChange={handleProjectFormChange}
                      className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="theme-muted text-sm font-semibold">Project image</span>
                    <input
                      key={projectImageInputKey}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
                      onChange={handleProjectImageChange}
                      className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                      required
                    />
                    <span className="theme-muted text-sm block mt-2">
                      Uploaded securely to Cloudinary. Use JPG, PNG, WEBP, GIF, or AVIF up to 8MB.
                    </span>
                  </label>
                  {projectImagePreview ? (
                    <div className="admin-upload-preview">
                      <div className="admin-upload-preview-image-shell">
                        <img
                          src={projectImagePreview}
                          alt="Project upload preview"
                          className="admin-upload-preview-image"
                        />
                      </div>
                      <div className="admin-upload-preview-copy">
                        <div className="admin-section-eyebrow">
                          <ImagePlus size={14} />
                          Image Ready
                        </div>
                        <p className="theme-muted mt-3">
                          {projectImageFile?.name || "Selected image"}
                        </p>
                      </div>
                    </div>
                  ) : null}
                  <label className="block">
                    <span className="theme-muted text-sm font-semibold">Live test URL</span>
                    <input
                      type="url"
                      name="liveUrl"
                      value={projectForm.liveUrl}
                      onChange={handleProjectFormChange}
                      className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                    />
                  </label>
                  <label className="block">
                    <span className="theme-muted text-sm font-semibold">Short description</span>
                    <textarea
                      name="description"
                      value={projectForm.description}
                      onChange={handleProjectFormChange}
                      rows={5}
                      className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                      required
                    />
                  </label>
                  {projectError ? (
                    <p className="admin-status-error">{projectError}</p>
                  ) : null}
                  <button
                    type="submit"
                    className="theme-button-primary px-6 py-3 w-full justify-center"
                    disabled={
                      isPublishingProject ||
                      isUploadingProjectImage ||
                      Boolean(projectSetupNotice)
                    }
                  >
                    {isUploadingProjectImage ? (
                      <>
                        <BrandLoader inline />
                        Uploading Image...
                      </>
                    ) : isPublishingProject ? (
                      <>
                        <BrandLoader inline />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Radio size={16} />
                        Publish Current Project
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="glass-card admin-section-card">
                <div className="admin-section-header admin-section-header--stacked">
                  <div>
                    <span className="admin-section-eyebrow">
                      <Radio size={14} />
                      Live on Projects Page
                    </span>
                    <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--text-primary)" }}>
                      Current project feed
                    </h2>
                  </div>
                </div>
                {projectSetupNotice ? (
                  <p className="theme-muted mt-4">{projectSetupNotice}</p>
                ) : null}
                <div className="admin-current-project-list">
                  {currentProjects.length ? (
                    currentProjects.map((project) => (
                      <article key={project.id} className="admin-current-project-card">
                        <div className="admin-current-project-image-shell">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="admin-current-project-image"
                          />
                        </div>
                        <div className="admin-current-project-copy">
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                          <div className="admin-current-project-meta">
                            <span>{formatDateTime(project.createdAt)}</span>
                          </div>
                          <div className="admin-current-project-actions">
                            {project.liveUrl ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="theme-button-primary px-5 py-3 inline-flex items-center"
                              >
                                Open Test Link
                              </a>
                            ) : (
                              <span className="theme-chip">Private test link</span>
                            )}
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="admin-empty-card">
                      <p>No current projects have been published yet.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-card admin-section-card">
                <div className="admin-section-header admin-section-header--stacked">
                  <div>
                    <span className="admin-section-eyebrow">
                      <Quote size={14} />
                      Publish Review
                    </span>
                    <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--text-primary)" }}>
                      Add a client review
                    </h2>
                  </div>
                </div>
                <form onSubmit={handleReviewSubmit} className="space-y-4 mt-6">
                  {reviewSetupNotice ? (
                    <p className="theme-muted">{reviewSetupNotice}</p>
                  ) : null}
                  <label className="block">
                    <span className="theme-muted text-sm font-semibold">Reviewer name</span>
                    <input
                      type="text"
                      name="authorName"
                      value={reviewForm.authorName}
                      onChange={handleReviewFormChange}
                      className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="theme-muted text-sm font-semibold">Role or company</span>
                    <input
                      type="text"
                      name="authorRole"
                      value={reviewForm.authorRole}
                      onChange={handleReviewFormChange}
                      className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                    />
                  </label>
                  <label className="block">
                    <span className="theme-muted text-sm font-semibold">Review</span>
                    <textarea
                      name="content"
                      value={reviewForm.content}
                      onChange={handleReviewFormChange}
                      rows={5}
                      className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="theme-muted text-sm font-semibold">Visibility</span>
                    <select
                      name="visibility"
                      value={reviewForm.visibility}
                      onChange={handleReviewFormChange}
                      className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.04)] p-4">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={reviewForm.isPublished}
                      onChange={handleReviewFormChange}
                    />
                    <span className="theme-muted text-sm font-semibold">
                      Publish immediately
                    </span>
                  </label>
                  {reviewError ? (
                    <p className="admin-status-error">{reviewError}</p>
                  ) : null}
                  <button
                    type="submit"
                    className="theme-button-primary px-6 py-3 w-full justify-center"
                    disabled={isSavingReview || Boolean(reviewSetupNotice)}
                  >
                    {isSavingReview ? (
                      <>
                        <BrandLoader inline />
                        Saving Review...
                      </>
                    ) : (
                      <>
                        <Quote size={16} />
                        Publish Review
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="glass-card admin-section-card">
                <div className="admin-section-header admin-section-header--stacked">
                  <div>
                    <span className="admin-section-eyebrow">
                      <Quote size={14} />
                      Review Controls
                    </span>
                    <h2 className="text-2xl font-bold mt-3" style={{ color: "var(--text-primary)" }}>
                      Public and private review feed
                    </h2>
                  </div>
                </div>
                {reviewSetupNotice ? (
                  <p className="theme-muted mt-4">{reviewSetupNotice}</p>
                ) : null}
                <div className="admin-chat-thread">
                  {reviews.length ? (
                    reviews.map((review) => (
                      <article key={review.id} className="admin-chat-card">
                        <div className="admin-chat-card-top">
                          <div>
                            <h3 className="admin-chat-name">{review.authorName}</h3>
                            <p className="admin-chat-subject">
                              {review.authorRole || "Client review"}
                            </p>
                          </div>
                          <span className="admin-chat-time">
                            {formatDateTime(review.createdAt)}
                          </span>
                        </div>
                        <div className="admin-chat-meta">
                          <span className="theme-chip">
                            {review.isPublished ? "Published" : "Draft"}
                          </span>
                          <span className="theme-chip">
                            {review.visibility === "public" ? "Public" : "Private"}
                          </span>
                        </div>
                        <p className="admin-chat-message">{review.content}</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            className="theme-button-primary px-5 py-3"
                            disabled={activeReviewId === review.id || Boolean(reviewSetupNotice)}
                            onClick={() =>
                              handleReviewUpdate(review.id, {
                                isPublished: !review.isPublished,
                              })
                            }
                          >
                            {activeReviewId === review.id ? (
                              <>
                                <BrandLoader inline />
                                Saving...
                              </>
                            ) : review.isPublished ? (
                              "Unpublish"
                            ) : (
                              "Publish"
                            )}
                          </button>
                          <button
                            type="button"
                            className="theme-button-secondary px-5 py-3"
                            disabled={activeReviewId === review.id || Boolean(reviewSetupNotice)}
                            onClick={() =>
                              handleReviewUpdate(review.id, {
                                visibility:
                                  review.visibility === "public"
                                    ? "private"
                                    : "public",
                              })
                            }
                          >
                            {activeReviewId === review.id ? (
                              <>
                                <BrandLoader inline />
                                Saving...
                              </>
                            ) : review.visibility === "public" ? (
                              "Make Private"
                            ) : (
                              "Make Public"
                            )}
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="admin-empty-card">
                      <p>No reviews have been added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Admin;
