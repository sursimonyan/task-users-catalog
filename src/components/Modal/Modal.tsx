import { useEffect, memo } from "react";
import cn from "classnames";

import styles from "./Modal.module.css";
import type { User } from "../../types/types";

interface ModalProps {
  user: User | null;
  onClose: () => void;
}

export const Modal = memo(({ user, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (user) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [user, onClose]);

  if (!user) return null;

  return (
    <div className={cn(styles.modalOverlay)} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(styles.modalContent)}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={cn(styles.closeButton)} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <div className={cn(styles.modalHeader)}>
          <img
            src={user.image}
            alt=""
            className={cn(styles.modalImage)}
            aria-hidden="true"
          />
          <div>
            <h2 id="modal-title" className={cn(styles.modalTitle)}>
              {user.firstName} {user.lastName}
            </h2>
            <p className={cn(styles.modalRole)}>{user.role}</p>
            <p className={cn(styles.modalUsername)}>@{user.username}</p>
          </div>
        </div>
        <div className={cn(styles.modalBody)}>
          <div className={cn(styles.infoGroup)}>
            <strong>Email:</strong> <span>{user.email || "N/A"}</span>
          </div>
          <div className={cn(styles.infoGroup)}>
            <strong>Phone:</strong> <span>{user.phone || "N/A"}</span>
          </div>
          <div className={cn(styles.infoGroup)}>
            <strong>Age:</strong> <span>{user.age ? `${user.age} years old` : "N/A"}</span>
          </div>
          <div className={cn(styles.infoGroup)}>
            <strong>Birth Date:</strong> <span>{user.birthDate || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
