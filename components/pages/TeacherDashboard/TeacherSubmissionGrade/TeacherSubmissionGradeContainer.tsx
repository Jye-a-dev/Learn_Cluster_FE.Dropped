"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BaseTeacherContainer from "@/components/pages/TeacherDashboard/Base/BaseTeacherContainer";
import BaseLoading from "@/components/pages/TeacherDashboard/Base/BaseLoading";

import { getSubmission, SubmissionBE } from "@/hooks/submission/getSubmission";
import {
  addGrade,
  getGradesBySubmission,
  updateGrade,
  Grade,
} from "@/hooks/grade/getGrade";

import SubmissionInfo from "./SubmissionInfo";
import GradeForm from ".//GradeForm";

export default function TeacherSubmissionGradeContainer() {
  const params = useParams();
  const submissionId = params.id as string;

  const [submission, setSubmission] = useState<SubmissionBE | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    score: "",
    feedback: "",
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!submissionId) return;

    (async () => {
      try {
        setLoading(true);

        const sub = await getSubmission(submissionId);
        setSubmission(sub);

        const grades = await getGradesBySubmission(submissionId);

        if (grades.length > 0) {
          const g = grades[0];
          setGrade(g);

          setForm({
            score: g.score?.toString() || "",
            feedback: g.feedback || "",
          });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [submissionId]);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!submissionId) return;

    if (grade) {
      const updated = await updateGrade(grade.id, {
        score: form.score ? Number(form.score) : null,
        feedback: form.feedback || null,
      });
      setGrade(updated);
    } else {
      const created = await addGrade({
        submission_id: submissionId,
        score: form.score ? Number(form.score) : null,
        feedback: form.feedback || null,
      });
      setGrade(created);
    }
  };

  if (loading) return <BaseLoading />;

  if (!submission) {
    return (
      <BaseTeacherContainer title="Submission">
        <div>Not found</div>
      </BaseTeacherContainer>
    );
  }

  return (
    <BaseTeacherContainer
      title="Grade Submission"
      description="Chấm điểm bài nộp"
    >
      <div className="grid grid-cols-2 gap-6">
        <SubmissionInfo submission={submission} />
        <GradeForm
          form={form}
          setForm={setForm}
          onSave={handleSave}
          isEditing={!!grade}
          grade={grade}
        />
      </div>
    </BaseTeacherContainer>
  );
}