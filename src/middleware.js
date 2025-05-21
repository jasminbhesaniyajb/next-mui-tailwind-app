import { NextResponse } from "next/server";
import { LOGIN_USER_COOKIE_KEY } from "./constant";

const publicRoutes = ["/login", "/signup"];

const privateRoutes = [
  "/products",
  "/products/[id]",
  "/profile",
  "/change-password",
];

const isPrivateRoute = (path) => {
  return !!privateRoutes.some((r) => path.startsWith(r));
};

const isPublicRoute = (path) => {
  return publicRoutes.includes(path);
};

export async function middleware(request) {
  const currentUser = request.cookies.get(LOGIN_USER_COOKIE_KEY)?.value;
  if (!currentUser && request.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname == "/") {
    if (currentUser) {
      return NextResponse.redirect(new URL("/products", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (!currentUser && isPrivateRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

   if (currentUser && request.nextUrl.pathname == '/login') {
    return NextResponse.redirect(new URL('/products', request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|svg).*)"],
};
