import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getMembers } from "./actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Edit, Trash2, Check, X } from "lucide-react";

interface MembersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { data: members, totalPages } = await getMembers({ page: currentPage });

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button asChild variant="default">
          <Link href="/members/create">Create Member</Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">SI.NO</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead className="w-[120px]">Signature</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  No members found. Create your first member to get started.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member, index) => {
                const serialNumber = (currentPage - 1) * 10 + index + 1;
                return (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{serialNumber}</TableCell>
                    <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.contactNumber}</TableCell>
                    <TableCell>{member.designation}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {member.signature ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Enabled</span>
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-red-600" />
                            <span className="text-sm">Disabled</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={currentPage > 1 ? `/members?page=${currentPage - 1}` : "#"}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`/members?page=${page}`}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={currentPage < totalPages ? `/members?page=${currentPage + 1}` : "#"}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}