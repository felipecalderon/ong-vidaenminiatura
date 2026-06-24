"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface CategoriaOption {
  id: string;
  nombre: string;
}

interface BarraFiltrosProps {
  categorias: CategoriaOption[];
  placeholder?: string;
  showCategoryFilter?: boolean;
}

export function BarraFiltros({
  categorias,
  placeholder = "Buscar...",
  showCategoryFilter = true,
}: BarraFiltrosProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(urlSearch);

  // Sync state with URL only when the URL parameter changes
  useEffect(() => {
    setSearchTerm(urlSearch);
  }, [urlSearch]);

  // Debounce search input changes
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (searchTerm === currentSearch) {
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      if (searchTerm.trim()) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (value) {
      params.set("categoriaId", value);
    } else {
      params.delete("categoriaId");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("categoriaId");
    params.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const hasActiveFilters = Boolean(
    searchParams.get("search") || searchParams.get("categoriaId"),
  );

  return (
    <div className="w-full bg-surface/60 backdrop-blur-md border border-outline-variant rounded-xl p-5 mb-10 shadow-xs transition-all duration-300 hover:shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full flex flex-col sm:flex-row gap-3 items-center">
          {/* Search Input */}
          <div className="flex-1 w-full relative">
            <InputGroup className="w-full bg-background/50 border-outline-variant hover:border-outline focus-within:border-primary transition-all duration-200">
              <InputGroupAddon align="inline-start">
                <Search className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-0 text-sm focus-visible:ring-0"
              />
            </InputGroup>
            {isPending && (
              <div className="absolute right-3 top-2.5 flex items-center gap-1.5">
                <span className="size-1.5 bg-primary rounded-full animate-ping" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Buscando
                </span>
              </div>
            )}
          </div>

          {/* Category Filter */}
          {showCategoryFilter && (
            <div className="w-full sm:w-64 relative flex items-center">
              <select
                value={searchParams.get("categoriaId") || ""}
                onChange={handleCategoryChange}
                className="flex h-9 w-full rounded-md border border-outline-variant bg-background/50 pl-9 pr-3 py-1 text-sm shadow-xs transition-all duration-200 outline-none hover:border-outline focus:border-primary focus:ring-1 focus:ring-primary text-foreground cursor-pointer appearance-none"
              >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 pointer-events-none text-muted-foreground">
                <SlidersHorizontal className="size-3.5" />
              </div>
              <div className="absolute right-3 pointer-events-none text-muted-foreground">
                <svg
                  role="img"
                  aria-label="Filtro por categoría"
                  className="size-4 fill-current opacity-70"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full md:w-auto h-9 gap-2 text-muted-foreground hover:text-foreground border-dashed border-outline-variant hover:border-outline transition-all duration-200"
          >
            <X className="size-4" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
}
