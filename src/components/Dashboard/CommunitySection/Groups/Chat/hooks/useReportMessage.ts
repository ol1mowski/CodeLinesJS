import { useState } from 'react';
import { Message } from '../../../../../../types/messages.types';
import toast from 'react-hot-toast';

type ReportReason = 'spam' | 'abuse' | 'inappropriate' | 'other';

export const useReportMessage = () => {
  const [messageToReport, setMessageToReport] = useState<Message | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openReportModal = (message: Message) => {
    setMessageToReport(message);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setMessageToReport(null);
    setIsReportModalOpen(false);
  };

  const handleReport = (reason: ReportReason, description: string) => {
    if (!messageToReport) return;

    // Tutaj później dodamy prawdziwe API
    console.log('Zgłoszenie wiadomości:', {
      messageId: messageToReport._id,
      reason,
      description,
      reportedAt: new Date().toISOString(),
      reportedBy: 'currentUserId' // później weźmiemy z kontekstu auth
    });

    toast.success('Wiadomość została zgłoszona');
    closeReportModal();
  };

  return {
    messageToReport,
    isReportModalOpen,
    openReportModal,
    closeReportModal,
    handleReport
  };
}; 