import { useState } from 'react';
import { Message } from '../../../../../../types/messages.types';
import { useReportMessageMutation } from './useReportMessageMutation';

type ReportReason = 'spam' | 'abuse' | 'inappropriate' | 'other';

export const useReportMessage = (groupId: string) => {
  const [messageToReport, setMessageToReport] = useState<Message | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const reportMessageMutation = useReportMessageMutation(groupId);

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

    reportMessageMutation.mutate({
      messageId: messageToReport._id,
      reason,
      description
    }, {
      onSuccess: () => {
        closeReportModal();
      }
    });
  };

  return {
    messageToReport,
    isReportModalOpen,
    openReportModal,
    closeReportModal,
    handleReport,
    isReporting: reportMessageMutation.isPending
  };
}; 