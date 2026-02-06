import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getSession();
  let isAuthenticated = false;
  let isAdmin = false;

  if (data && data.user.role) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.Admin;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAdmin && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (!isAdmin && pathname === "/admin-dashboard") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*"],
};
