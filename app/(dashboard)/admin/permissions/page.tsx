import { redirect } from "next/navigation";

export default function AdminPermissionPage() {
	redirect("/admin/roles");
}
