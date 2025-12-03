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
import Image from "next/image";
import { DeleteButton } from "./components/DeleteButton";

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
              <TableHead className="w-[80px] text-center">SI.NO</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">Designation</TableHead>
              <TableHead className="w-[80px] text-center">Country</TableHead>
              <TableHead className="w-[120px] text-center">Signature</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                  No members found. Create your first member to get started.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member, index) => {
                const serialNumber = (currentPage - 1) * 10 + index + 1;
                return (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium text-center">{serialNumber}</TableCell>
                    <TableCell className="text-center">{`${member.firstName} ${member.lastName}`}</TableCell>
                    <TableCell className="text-center">{member.email}</TableCell>
                    <TableCell className="text-center">{member.contactNumber}</TableCell>
                    <TableCell className="text-center">{member.designation}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        {member.countryCode ? (
                          <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                            <Image
                              src={`/flags/${member.countryCode}.svg`}
                              alt={member.country || "Country flag"}
                              width={24}
                              height={24}
                              className="w-6 h-6 object-cover"
                            />
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">NA</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {member.signature ? (
                          <>
                            <Check className="h-4 w-4 text-green-600" />
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 text-red-600" />
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/members/edit/${member.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteButton 
                          memberId={member.id} 
                          memberName={`${member.firstName} ${member.lastName}`}
                        />
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