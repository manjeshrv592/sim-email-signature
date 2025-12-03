import { notFound } from "next/navigation"
import { getMemberById } from "../../actions"
import EditMemberForm from "./EditMemberForm"

interface EditMemberPageProps {
  params: Promise<{ id: string }>
}

export default async function EditMemberPage({ params }: EditMemberPageProps) {
  const { id } = await params
  const result = await getMemberById(id)

  if (result.error || !result.data) {
    notFound()
  }

  return <EditMemberForm member={result.data} />
}
