"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Market {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  location: string;
  categories: string[];
  productCount: number;
  status?: "approved" | "pending" | "rejected";
}

interface MarketGridProps {
  markets?: Market[];
  isAdmin?: boolean;
  onApprove?: (marketId: string) => void;
  onReject?: (marketId: string) => void;
}

export default function MarketGrid({
  markets = defaultMarkets,
  isAdmin = false,
  onApprove = () => {},
  onReject = () => {},
}: MarketGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filterCategory, setFilterCategory] = useState("all");

  // Extract all unique categories from markets
  const allCategories = [
    ...new Set(markets.flatMap((market) => market.categories)),
  ];

  // Filter and sort markets
  const filteredMarkets = markets
    .filter((market) => {
      const matchesSearch =
        market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || market.categories.includes(filterCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "products") return b.productCount - a.productCount;
      return 0;
    });

  return (
    <div className="w-full bg-background p-4">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Alphabetical</SelectItem>
              <SelectItem value="products">Most Products</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredMarkets.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">No markets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMarkets.map((market) => (
            <Card key={market.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={market.image}
                  alt={market.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{market.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{market.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {market.location}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {market.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {market.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="text-xs"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="text-sm">{market.productCount} products</div>
                {isAdmin && market.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReject(market.id)}
                    >
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => onApprove(market.id)}>
                      Approve
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline">
                    View Market
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Default markets data for demonstration
const defaultMarkets: Market[] = [
  {
    id: "1",
    name: "Fresh Harvest Market",
    description:
      "A vibrant marketplace offering locally sourced organic produce, artisanal goods, and specialty foods from regional farmers and producers.",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
    rating: 4.8,
    location: "Downtown",
    categories: ["Produce", "Organic", "Artisanal"],
    productCount: 120,
    status: "approved",
  },
  {
    id: "2",
    name: "Craftsman's Corner",
    description:
      "Handcrafted furniture, home decor, and unique gifts made by local artisans using traditional techniques and sustainable materials.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    rating: 4.6,
    location: "Westside",
    categories: ["Furniture", "Home Decor", "Handcrafted"],
    productCount: 85,
    status: "approved",
  },
  {
    id: "3",
    name: "Tech Bazaar",
    description:
      "The latest gadgets, electronics, and tech accessories with expert advice and competitive prices. Find everything from smartphones to smart home devices.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    rating: 4.5,
    location: "Tech District",
    categories: ["Electronics", "Gadgets", "Computers"],
    productCount: 210,
    status: "approved",
  },
  {
    id: "4",
    name: "Vintage Treasures",
    description:
      "Curated collection of vintage clothing, accessories, vinyl records, and collectibles from the 1950s through the 1990s.",
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    rating: 4.7,
    location: "Old Town",
    categories: ["Vintage", "Clothing", "Collectibles"],
    productCount: 150,
    status: "pending",
  },
  {
    id: "5",
    name: "Book Nook",
    description:
      "Independent bookstore featuring bestsellers, rare finds, and local authors. Cozy reading spaces and regular author events.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
    rating: 4.9,
    location: "University District",
    categories: ["Books", "Stationery", "Gifts"],
    productCount: 3000,
    status: "pending",
  },
  {
    id: "6",
    name: "Gourmet Pantry",
    description:
      "Specialty food market with imported delicacies, fine wines, artisanal cheeses, and gourmet ingredients from around the world.",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
    rating: 4.7,
    location: "Riverside",
    categories: ["Gourmet", "Imported", "Specialty Foods"],
    productCount: 450,
    status: "approved",
  },
];
