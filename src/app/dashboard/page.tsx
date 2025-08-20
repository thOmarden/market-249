import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketGrid from "@/components/dashboard/MarketGrid";
import ProductManager from "@/components/dashboard/ProductManager";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, ShoppingBag, Store, Users } from "lucide-react";

export default function DashboardPage() {
  // This would normally be fetched from an auth context or API
  const userRole = "customer"; // Options: 'customer', 'vendor', 'admin'
  const userName = "John Doe";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 p-6 md:flex">
        <div className="flex items-center gap-2 pb-6">
          <Store className="h-6 w-6" />
          <h2 className="text-xl font-bold">249 Market</h2>
        </div>

        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            Dashboard
          </a>
          {userRole === "customer" && (
            <>
              <a
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
              >
                <Store className="h-4 w-4" />
                Markets
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
              >
                <Bell className="h-4 w-4" />
                Watchlist
              </a>
            </>
          )}
          {userRole === "vendor" && (
            <>
              <a
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
              >
                <Store className="h-4 w-4" />
                My Market
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
              >
                <ShoppingBag className="h-4 w-4" />
                Products
              </a>
            </>
          )}
          {userRole === "admin" && (
            <>
              <a
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
              >
                <Store className="h-4 w-4" />
                Markets
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
              >
                <Users className="h-4 w-4" />
                Users
              </a>
            </>
          )}
          <a
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted"
          >
            <Settings className="h-4 w-4" />
            Settings
          </a>
        </nav>

        <div className="mt-auto pt-6">
          <div className="flex items-center gap-3 rounded-md bg-muted p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {userName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {userRole}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 pt-4">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userName}</p>
          </div>
          <Badge variant="outline" className="capitalize">
            {userRole}
          </Badge>
        </header>

        {/* Customer Dashboard */}
        {userRole === "customer" && (
          <Tabs defaultValue="markets" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
            </TabsList>
            <TabsContent value="markets">
              <Card>
                <CardHeader>
                  <CardTitle>Browse Markets</CardTitle>
                  <CardDescription>
                    Discover local markets and products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketGrid />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="watchlist">
              <Card>
                <CardHeader>
                  <CardTitle>Your Watchlist</CardTitle>
                  <CardDescription>
                    Products you're interested in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>You haven't added any products to your watchlist yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reservations">
              <Card>
                <CardHeader>
                  <CardTitle>Your Reservations</CardTitle>
                  <CardDescription>
                    Track your product reservations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>You don't have any active reservations.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Vendor Dashboard */}
        {userRole === "vendor" && (
          <Tabs defaultValue="market" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="market">My Market</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="reservations">Reservations</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="market">
              <Card>
                <CardHeader>
                  <CardTitle>Your Market</CardTitle>
                  <CardDescription>Manage your market details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                      <Store className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Vendor's Market Name
                    </h3>
                    <p className="text-muted-foreground">
                      Your market description would appear here. Add details
                      about what makes your market special.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Products</CardTitle>
                  <CardDescription>
                    Add, edit, and remove products from your market
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductManager />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reservations">
              <Card>
                <CardHeader>
                  <CardTitle>Product Reservations</CardTitle>
                  <CardDescription>
                    Manage customer reservations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>You don't have any pending reservations to manage.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    View and respond to customer feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>
                      No reviews have been submitted for your market or products
                      yet.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Admin Dashboard */}
        {userRole === "admin" && (
          <Tabs defaultValue="markets" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="moderation">Moderation</TabsTrigger>
            </TabsList>
            <TabsContent value="markets">
              <Card>
                <CardHeader>
                  <CardTitle>Market Approval</CardTitle>
                  <CardDescription>
                    Review and approve market applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketGrid isAdminView={true} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="grid grid-cols-4 font-medium">
                        <div>Name</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div>Status</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="grid grid-cols-4 p-4">
                          <div>User {i}</div>
                          <div>user{i}@example.com</div>
                          <div className="capitalize">
                            {i === 3 ? "vendor" : "customer"}
                          </div>
                          <div>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                            >
                              Active
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="moderation">
              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation</CardTitle>
                  <CardDescription>Review reported content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No content has been reported for moderation.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
