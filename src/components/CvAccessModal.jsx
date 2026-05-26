import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, LockKeyhole, Send, X } from "lucide-react";
import axios from "axios";
import API_URL from "../screens/mainstack/config";
import BrandLoader from "./BrandLoader";
import {
  clearCvAccessSession,
  getStoredCvAccessSession,
  persistCvAccessSession,
} from "../utils/cvAccessStorage";

const initialRequestForm = {
  email: "",
  name: "",
  message: "",
  website: "",
};

const formatTime = (value) => {
  if (!value) {
    return "";
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

const CvAccessModal = ({ isOpen, onClose }) => {
  const [requestForm, setRequestForm] = useState(initialRequestForm);
  const [chatId, setChatId] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatStatus, setChatStatus] = useState("pending");
  const [accessToken, setAccessToken] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [error, setError] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const downloadUrl = useMemo(() => {
    if (!accessToken) {
      return "";
    }

    return `${API_URL}/api/cv-access/download?token=${encodeURIComponent(accessToken)}`;
  }, [accessToken]);

  const applyChatState = (payload) => {
    setMessages(payload?.messages ?? []);
    setChatStatus(payload?.chat?.status || "pending");
    setAccessToken(payload?.accessToken || "");
  };

  const loadChat = async (nextChatId, nextEmail, { silent = false } = {}) => {
    if (!nextChatId || !nextEmail) {
      return;
    }

    if (!silent) {
      setIsLoadingChat(true);
    }

    setError("");

    try {
      const response = await axios.get(
        `${API_URL}/api/cv-access/chats/${nextChatId}`,
        {
          params: { email: nextEmail },
        }
      );

      applyChatState(response.data);
    } catch (requestError) {
      if (!silent) {
        setError(
          requestError.response?.data?.error ||
            "The CV access chat could not be loaded."
        );
      }
    } finally {
      if (!silent) {
        setIsLoadingChat(false);
      }
    }
  };

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
      setRequestForm(initialRequestForm);
      setReplyMessage("");
      setError("");
      setIsStarting(false);
      setIsSending(false);
      setIsLoadingChat(false);
      return;
    }

    const storedSession = getStoredCvAccessSession();

    if (storedSession.chatId && storedSession.email) {
      setChatId(storedSession.chatId);
      setRequesterEmail(storedSession.email);
      loadChat(storedSession.chatId, storedSession.email);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !chatId || !requesterEmail || accessToken) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      loadChat(chatId, requesterEmail, { silent: true });
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [isOpen, chatId, requesterEmail, accessToken]);

  const handleRequestChange = (event) => {
    const { name, value } = event.target;
    setRequestForm((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const handleStartChat = async (event) => {
    event.preventDefault();
    setIsStarting(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/cv-access/chats`, requestForm);
      const nextChat = response.data?.chat;
      const nextEmail = nextChat?.requesterEmail || requestForm.email.trim().toLowerCase();
      const nextChatId = nextChat?.id || "";

      if (!nextChatId || !nextEmail) {
        throw new Error("Missing chat session details.");
      }

      persistCvAccessSession(nextChatId, nextEmail);
      setChatId(nextChatId);
      setRequesterEmail(nextEmail);
      applyChatState(response.data);
      setRequestForm(initialRequestForm);
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Your CV access request could not be started."
      );
    } finally {
      setIsStarting(false);
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!replyMessage.trim()) {
      return;
    }

    setIsSending(true);
    setError("");

    try {
      await axios.post(`${API_URL}/api/cv-access/chats/${chatId}/messages`, {
        email: requesterEmail,
        message: replyMessage.trim(),
      });
      setReplyMessage("");
      await loadChat(chatId, requesterEmail, { silent: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.error || "Your message could not be sent."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleResetSession = () => {
    clearCvAccessSession();
    setChatId("");
    setRequesterEmail("");
    setMessages([]);
    setChatStatus("pending");
    setAccessToken("");
    setReplyMessage("");
    setError("");
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
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
            className="review-modal-shell cv-access-modal-shell"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="review-modal-close"
              onClick={onClose}
              aria-label="Close CV access chat"
            >
              <X size={18} />
            </button>

            <div className="cv-access-modal-header">
              <span className="admin-login-badge">
                <LockKeyhole size={14} />
                Protected CV Access
              </span>
              <h2 className="gradient-text mt-4 text-2xl font-bold">
                Request CV Download
              </h2>
              <p className="theme-muted mt-3">
                Start a short access chat. An admin will review your request and
                reply here with a one-time download token.
              </p>
            </div>

            {error ? <p className="admin-status-error mt-4">{error}</p> : null}

            {!chatId ? (
              <form className="cv-access-request-form mt-6" onSubmit={handleStartChat}>
                <label className="block">
                  <span className="theme-muted text-sm font-semibold">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={requestForm.email}
                    onChange={handleRequestChange}
                    className="theme-form-input mt-2 block w-full rounded-lg p-3"
                    placeholder="you@company.com"
                    required
                  />
                </label>
                <label className="mt-4 block">
                  <span className="theme-muted text-sm font-semibold">Name (optional)</span>
                  <input
                    type="text"
                    name="name"
                    value={requestForm.name}
                    onChange={handleRequestChange}
                    className="theme-form-input mt-2 block w-full rounded-lg p-3"
                    placeholder="Your name"
                  />
                </label>
                <label className="mt-4 block">
                  <span className="theme-muted text-sm font-semibold">Message</span>
                  <textarea
                    name="message"
                    value={requestForm.message}
                    onChange={handleRequestChange}
                    className="theme-form-input mt-2 block min-h-28 w-full rounded-lg p-3"
                    placeholder="Tell the admin why you need the CV."
                  />
                </label>
                <input
                  type="text"
                  name="website"
                  value={requestForm.website}
                  onChange={handleRequestChange}
                  className="review-honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="theme-button-primary mt-6 w-full px-6 py-3"
                  disabled={isStarting}
                >
                  {isStarting ? "Opening chat..." : "Open Access Chat"}
                </button>
              </form>
            ) : (
              <div className="cv-access-chat mt-6">
                <div className="cv-access-chat-meta">
                  <div>
                    <p className="cv-access-chat-label">Chat ID</p>
                    <p className="cv-access-chat-value">{chatId}</p>
                  </div>
                  <div>
                    <p className="cv-access-chat-label">Username</p>
                    <p className="cv-access-chat-value">{requesterEmail}</p>
                  </div>
                  <div>
                    <p className="cv-access-chat-label">Status</p>
                    <p className="cv-access-chat-value">{chatStatus}</p>
                  </div>
                </div>

                {isLoadingChat && !messages.length ? (
                  <BrandLoader label="Loading chat" compact className="mt-6" />
                ) : (
                  <div className="cv-access-message-list mt-6">
                    {messages.map((message) => (
                      <article
                        key={message.id}
                        className={`cv-access-message cv-access-message--${message.senderRole}`}
                      >
                        <div className="cv-access-message-top">
                          <strong>{message.senderLabel}</strong>
                          <span>{formatTime(message.createdAt)}</span>
                        </div>
                        <p>{message.content}</p>
                      </article>
                    ))}
                  </div>
                )}

                {accessToken ? (
                  <a
                    href={downloadUrl}
                    className="theme-button-primary mt-6 inline-flex w-full items-center justify-center px-6 py-3"
                    download="SirChampion-CV.pdf"
                  >
                    <Download size={16} className="mr-2" />
                    Download CV
                  </a>
                ) : (
                  <p className="theme-muted mt-6 text-sm">
                    Waiting for admin approval. This chat refreshes automatically.
                  </p>
                )}

                <form className="cv-access-reply-form mt-6" onSubmit={handleSendMessage}>
                  <textarea
                    value={replyMessage}
                    onChange={(event) => setReplyMessage(event.target.value)}
                    className="theme-form-input block min-h-24 w-full rounded-lg p-3"
                    placeholder="Send a follow-up in this chat..."
                  />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="theme-button-secondary inline-flex items-center px-5 py-3"
                      disabled={isSending}
                    >
                      <Send size={15} className="mr-2" />
                      {isSending ? "Sending..." : "Send Message"}
                    </button>
                    <button
                      type="button"
                      className="theme-button-secondary px-5 py-3"
                      onClick={handleResetSession}
                    >
                      Start New Request
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

export default CvAccessModal;
