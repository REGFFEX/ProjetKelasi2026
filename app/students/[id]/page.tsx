'use client';

import { AppShell } from '@/components/app-shell';
import { StudentDetailContent } from './student-detail-content';
import { students } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = students.find(s => s.id === params.id);
  if (!student) notFound();

  return (
    <AppShell>
      <StudentDetailContent studentId={params.id} />
    </AppShell>
  );
}
