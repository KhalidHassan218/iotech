"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ChevronDown, Menu, X } from "lucide-react";

import { Link } from "@/i18n/navigation";

import SearchBar from "../common/SearchBar";
import { LanguageSwitcher } from "../switchers/LanguageSwitcher";
import { ThemeSwitcher } from "../switchers/ThemeSwitcher";
import { Button } from "../ui";

const serviceKeys = [
  "legalConsultation",
  "foreignInvestment",
  "contracts",
  "notarization",
  "insurance",
  "defenseCases",
  "banksFinancial",
  "corporateGovernance",
  "companiesLiquidation",
  "internalRegulations",
  "companyServices",
  "arbitration",
  "intellectualProperty",
  "corporateRestructuring",
  "establishingCompanies",
  "commercialAgencies",
  "vision2030",
  "estates",
];
const Header = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const t = useTranslations("Header");

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const showBg = hovered || servicesOpen || mobileMenuOpen;

  return (
    <header
      className={`w-full absolute top-0 z-50 transition-colors duration-500 ${
        showBg
          ? "bg-accent text-on-dark shadow-md"
          : "bg-transparent text-current"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="max-w-[1440px] mx-auto py-4 px-4 sm:px-6 lg:px-12">
        <div className="flex relative items-center justify-between h-16">
          <div className="flex items-center shrink-0">
            <Link href="/">
              <Image
                priority
                alt="Logo"
                className="object-contain"
                height={40}
                src="/assets/logo.png"
                width={120}
              />
            </Link>
          </div>

          <nav className="hidden md:flex gap-6 h-full items-center">
            <Link
              className="hover:text-on-dark transition-colors flex items-center h-full px-2"
              href="/"
            >
              {t("nav.home")}
            </Link>

            <div
              className="h-full flex items-center"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer hover:text-on-dark transition-colors h-full px-2">
                <span>{t("nav.services")}</span>
                <ChevronDown size={16} />
              </div>

              {servicesOpen && (
                <div className="absolute left-0 right-0 top-[90%] mt-2 w-full rounded-lg bg-accent shadow-lg border border-accent py-4 px-6 grid grid-cols-4 gap-4 text-on-dark max-h-[70vh] overflow-y-auto">
                  {serviceKeys.map((service) => (
                    <Link
                      key={service}
                      className="block py-1 hover:text-yellow-300 transition-colors text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                      href={`/${service}`}
                    >
                      {t(`services.${service}`)}{" "}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              className="hover:text-on-dark transition-colors flex items-center h-full px-2"
              href="/about"
            >
              {t("nav.about")}
            </Link>
            <Link
              className="hover:text-on-dark transition-colors flex items-center h-full px-2"
              href="/contact"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeSwitcher />
            <SearchBar />
            <LanguageSwitcher />
            <Button variant="primary">{t("button.book")}</Button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <SearchBar />
            <Button className="hidden sm:block" variant="primary">
              {t("button.book")}
            </Button>
            <button
              className="p-2 rounded-md hover:bg-accent/80 transition"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-accent text-on-dark shadow-lg border-t border-white/20 transition-all duration-300 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-4 py-4">
            {/* Main navigation links */}
            <Link
              className="block py-3 px-3 hover:bg-white/10 rounded-lg transition-colors border-b border-white/10"
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>

            <div className="border-b border-white/10">
              <button
                className="flex items-center justify-between py-3 px-3 w-full hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>{t("nav.services")}</span>
                <ChevronDown
                  className={`${servicesOpen ? "rotate-180" : ""} transition-transform`}
                  size={16}
                />
              </button>
              {servicesOpen && (
                <div className="flex flex-col ml-2 mt-1 mb-2">
                  {serviceKeys.map((service) => (
                    <Link
                      key={service}
                      className="block py-2 px-4 hover:bg-white/10 rounded-lg transition-colors text-sm"
                      href={`/${service}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(`services.${service}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              className="block py-3 px-3 hover:bg-white/10 rounded-lg transition-colors border-b border-white/10"
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              className="block py-3 px-3 hover:bg-white/10 rounded-lg transition-colors border-b border-white/10"
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>

            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-dark/80">Theme</span>
                <ThemeSwitcher />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-dark/80">Language</span>
                <LanguageSwitcher />
              </div>
              <Button
                className="w-full mt-2"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("button.book")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
