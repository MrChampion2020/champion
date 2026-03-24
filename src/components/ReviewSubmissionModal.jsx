import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, X } from "lucide-react";
import axios from "axios";
import API_URL from "../screens/mainstack/config";
import BrandLoader from "./BrandLoader";
import {
  formatReviewMonthYear,
  getReviewAuthor,
  getReviewContent,
} from "../utils/reviews";

const initialFormState = {
  name: "",
  comment: "",
  website: "",
};

const ReviewSubmissionModal = ({ isOpen, onClose, reviews = [] }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewFeed, setReviewFeed] = useState(reviews);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const currentMonthYear = useMemo(
    () =>
      new Date().toLocaleDateString("en-NG", {
        month: "short",
        year: "numeric",
      }),
    []
  );

  useEffect(() => {
    setReviewFeed(reviews);
  }, [reviews]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setFormState(initialFormState);
      setError("");
      setSuccessMessage("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    let isCancelled = false;

    const loadReviews = async () => {
      setIsLoadingReviews(true);

      try {
        const response = await axios.get(`${API_URL}/api/reviews?limit=6`);
        const nextReviews = response.data?.reviews ?? [];

        if (!isCancelled) {
          setReviewFeed(nextReviews);
        }
      } catch {
        if (!isCancelled) {
          setReviewFeed(reviews);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingReviews(false);
        }
      }
    };

    loadReviews();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, reviews]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/api/reviews`, formState, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage(
        response.data?.message ||
          "Thank you. Your review has been submitted for approval."
      );
      setFormState(initialFormState);
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Your review could not be submitted right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                className="review-modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
              >
                <motion.div
                  className="glass-card review-modal-shell"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onClick={(event) => event.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="share-review-title"
                >
                  <button
                    type="button"
                    className="review-modal-close"
                    onClick={onClose}
                    aria-label="Close review form"
                  >
                    <X size={18} />
                  </button>
                  <div className="review-modal-grid">
                    <div className="review-modal-form">
                      <div className="admin-section-eyebrow">
                        <Quote size={14} />
                        Share Your Review
                      </div>
                      <h2 id="share-review-title" className="blog-modal-title mt-4">
                        Leave a review
                      </h2>
                      <p className="blog-modal-excerpt mt-4">
                        Your review will be sent to admin first. Approval is required
                        before it appears publicly.
                      </p>
                      <p className="review-modal-date mt-3">
                        Date tag: {currentMonthYear}
                      </p>
                      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <input
                          type="text"
                          name="website"
                          value={formState.website}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                          className="review-honeypot"
                          aria-hidden="true"
                        />
                        <label className="block">
                          <span className="theme-muted text-sm font-semibold">Name</span>
                          <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                            required
                          />
                        </label>
                        <label className="block">
                          <span className="theme-muted text-sm font-semibold">Comment</span>
                          <textarea
                            name="comment"
                            value={formState.comment}
                            onChange={handleChange}
                            rows={5}
                            className="theme-form-input mt-2 block w-full rounded-2xl p-3"
                            required
                          />
                        </label>
                        {error ? <p className="admin-status-error">{error}</p> : null}
                        {successMessage ? (
                          <p className="review-modal-success">{successMessage}</p>
                        ) : null}
                        <button
                          type="submit"
                          className="theme-button-primary px-6 py-3 w-full justify-center"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <BrandLoader inline />
                              Sending Review...
                            </>
                          ) : (
                            "Submit Review"
                          )}
                        </button>
                      </form>
                    </div>

                    <div className="review-modal-preview">
                      <div className="admin-section-eyebrow">
                        <Quote size={14} />
                        Current Reviews
                      </div>
                      <div className="review-modal-preview-list mt-6">
                        {isLoadingReviews ? (
                          <div className="review-modal-preview-card">
                            <div className="flex items-center justify-center gap-3 theme-muted">
                              <BrandLoader inline />
                              Loading approved reviews...
                            </div>
                          </div>
                        ) : reviewFeed.length ? (
                          reviewFeed.map((review) => (
                            <article key={review.id} className="review-modal-preview-card">
                              <p className="review-modal-preview-author">
                                {getReviewAuthor(review)}
                              </p>
                              <p className="review-modal-preview-meta">
                                {formatReviewMonthYear(review.createdAt)}
                              </p>
                              <p className="review-modal-preview-copy">
                                "{getReviewContent(review)}"
                              </p>
                            </article>
                          ))
                        ) : (
                          <div className="review-modal-preview-card">
                            <p className="theme-muted text-center">
                              Approved reviews will appear here once fetched from the database.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )
      : null
  );
};

export default ReviewSubmissionModal;
