"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

import { Search } from "lucide-react";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Header");

  return (
    <div className="relative">
      <Search
        className="cursor-pointer text-foreground"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <input
          className="absolute top-8 right-0 border border-white rounded-md p-2 bg-accent text-on-dark placeholder:text-on-dark/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 w-64"
          placeholder={t("search.placeholder")}
          type="text"
        />
      )}
    </div>
  );
};

export default SearchBar;
