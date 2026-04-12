import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  Users,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  LogOut,
  ChevronRight,
  TrendingDown,
  DollarSign,
  Briefcase,
  Settings,
  Calendar,
  FileText,
  BarChart3,
  Search,
  Filter,
  Shield,
  Activity,
  Check,
  Ban,
  Download,
  Building2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { adminService } from "../services/admin.service";
import {
  prebookingService,
  type Prebooking,
} from "../services/prebooking.service";
import { contractService } from "../services/contract.service";
import { getImageUrl } from "../utils/imageUtils";
import ContractGenerationModal from "../components/admin/ContractGenerationModal";
import type {
  AdminStats,
  AgencyStats,
  Vehicle,
  AuditLog,
  PlatformConfig,
} from "../services/admin.service";
import Navbar from "../components/Navbar";
import AnalyticsDashboard from "../components/analytics/AnalyticsDashboard";

const AdminPanel: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "fleet"
    | "agencies"
    | "bookings"
    | "settings"
    | "analytics"
    | "audit_logs"
    | "platform_config"
    | "applications"
  >("dashboard");
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [agencyStats, setAgencyStats] = useState<AgencyStats | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [prebookings, setPrebookings] = useState<Prebooking[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig | null>(
    null,
  );
  const [partnershipRequests, setPartnershipRequests] = useState<any[]>([]);
  const [loadingContracts, setLoadingContracts] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Car Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCar, setCurrentCar] = useState<Partial<Vehicle>>({
    brand: "",
    model: "",
    year: "",
    price: undefined,
    specs: {
      fuel: "",
      transmission: "",
      seats: undefined,
    },
    category: "",
    is_luxury: false,
    img_path: "",
    availability: "available",
  });
  const [vehicleImageFile, setVehicleImageFile] = useState<File | null>(null);
  const [vehicleImagePreview, setVehicleImagePreview] = useState<string | null>(
    null,
  );

  // Agency Form Modal State
  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);
  const [currentAgency, setCurrentAgency] = useState({
    _id: "" as string | undefined,
    email: "",
    name: "",
    phone: "",
    address: "",
    img_path: "",
  });
  const [agencyImageFile, setAgencyImageFile] = useState<File | null>(null);
  const [agencyImagePreview, setAgencyImagePreview] = useState<string | null>(
    null,
  );

  // Booking Management search/sort state
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("date_desc");
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [selectedPrebooking, setSelectedPrebooking] =
    useState<Prebooking | null>(null);

  // Partnership Approval Modal
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [approvalPassword, setApprovalPassword] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    } else if (!authLoading && user && user.role === "customer") {
      navigate("/");
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  useEffect(() => {
    const fetchData = async (isInitialLog = false) => {
      if (!user) return;
      if (isInitialLog) setIsLoading(true);
      try {
        if (user.role === "superadmin") {
          console.log("there is a superadmin here ");
          const [stats, logs, config, requests] = await Promise.all([
            adminService.getSuperAdminStats(),
            adminService.getAuditLogs(),
            adminService.getPlatformConfig(),
            adminService.getPartnershipRequests(),
          ]);
          setAdminStats(stats);
          setAuditLogs(logs);
          setPlatformConfig(config);
          setPartnershipRequests(requests);
        } else if (user.role === "agency") {
          const [stats, fleet, prebookingsData] = await Promise.all([
            adminService.getAgencyStats(),
            adminService.getAgencyVehicles(),
            prebookingService.getAgencyPrebookings({
              search: debouncedSearchTerm,
              sort: sortOrder,
            }),
          ]);
          setAgencyStats(stats);
          setVehicles(fleet);
          setPrebookings(prebookingsData);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        if (isInitialLog) setIsLoading(false);
      }
    };

    if (
      !authLoading &&
      user &&
      (user.role === "superadmin" || user.role === "agency")
    ) {
      // Only set loading for initial fetch or role change, not for every search keystroke
      fetchData(isLoading);
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [authLoading, user, debouncedSearchTerm, sortOrder]);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentCar._id) {
        await adminService.updateVehicleWithImage(
          currentCar._id,
          currentCar,
          vehicleImageFile,
        );
      } else {
        await adminService.createVehicleWithImage(currentCar, vehicleImageFile);
      }
      setIsModalOpen(false);
      // Refresh fleet
      const fetchedVehicles = await adminService.getAgencyVehicles();
      setVehicles(fetchedVehicles);

      if (user?.role === "agency") {
        try {
          const fetchedPrebookings =
            await prebookingService.getAgencyPrebookings();
          setPrebookings(fetchedPrebookings);
        } catch (err) {
          console.error("Failed to fetch prebookings", err);
        }
      }
      // Reset form
      setCurrentCar({
        brand: "",
        model: "",
        year: "",
        price: undefined,
        specs: {
          fuel: "",
          transmission: "",
          seats: undefined,
        },
        category: "",
        is_luxury: false,
        img_path: "",
        availability: "available",
      });
      setVehicleImageFile(null);
      setVehicleImagePreview(null);
    } catch (err) {
      console.error(err);
      setError("Failed to save vehicle.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await adminService.deleteVehicle(id);
        setVehicles(vehicles.filter((v) => v._id !== id));
      } catch (err) {
        console.error(err);
        setError("Failed to delete vehicle.");
      }
    }
  };

  const handleCreateAgency = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use FormData for file upload
      await adminService.createAgencyWithImage(currentAgency, agencyImageFile);
      setIsAgencyModalOpen(false);
      // Refresh stats
      const stats = await adminService.getSuperAdminStats();
      setAdminStats(stats);
      // Reset form
      setCurrentAgency({
        _id: undefined,
        email: "",
        name: "",
        phone: "",
        address: "",
        img_path: "",
      });
      setAgencyImageFile(null);
      setAgencyImagePreview(null);
      alert("Agency created successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data || "Failed to create agency.");
    }
  };

  const openEditModal = (vehicle: Vehicle) => {
    setCurrentCar(vehicle);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setCurrentCar({
      brand: "",
      model: "",
      year: "",
      price: undefined,
      specs: {
        fuel: "",
        transmission: "",
        seats: undefined,
      },
      category: "",
      is_luxury: false,
      img_path: "",
      availability: "available",
    });
    setVehicleImageFile(null);
    setVehicleImagePreview(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleVehicleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVehicleImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVehicleImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAgencyImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAgencyImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAgencyImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openContractModal = (booking: Prebooking) => {
    setSelectedPrebooking(booking);
    setIsContractModalOpen(true);
  };

  const handleGenerateContract = async (overrides: any) => {
    if (!selectedPrebooking) return;

    const prebookingId = selectedPrebooking._id;
    setLoadingContracts((prev) => ({ ...prev, [prebookingId]: true }));
    setIsContractModalOpen(false); // Close immediately or after success? User choice. Let's close and show loader on row.

    try {
      const contract = await contractService.generateContract(
        prebookingId,
        overrides,
      );
      await contractService.downloadContract(contract._id);
    } catch (err) {
      console.error("Failed to generate contract", err);
      setError("Failed to generate contract. Please try again.");
    } finally {
      setLoadingContracts((prev) => ({ ...prev, [prebookingId]: false }));
    }
  };

  const handleDeletePrebooking = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to delete this booking request?")
    )
      return;
    try {
      await prebookingService.deletePrebooking(id);
      setPrebookings((prev) => prev.filter((b) => b._id !== id));
      alert("Booking request deleted successfully.");
    } catch (err) {
      console.error("Failed to delete prebooking", err);
      setError("Failed to delete booking request.");
    }
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      await prebookingService.updatePrebookingStatus(id, newStatus);
      // Refresh bookings
      const fetchedPrebookings = await prebookingService.getAgencyPrebookings({
        search: searchTerm,
        sort: sortOrder,
      });
      setPrebookings(fetchedPrebookings);
    } catch (err) {
      console.error(err);
      setError("Failed to update booking status.");
    }
  };

  const handleUpdateConfig = async (key: keyof PlatformConfig, value: any) => {
    if (!platformConfig) return;
    try {
      const newConfig = { ...platformConfig, [key]: value };
      await adminService.updatePlatformConfig(newConfig);
      setPlatformConfig(newConfig);
    } catch (err) {
      console.error(err);
      setError("Failed to update platform config.");
    }
  };

  const handleExportData = () => {
    alert("Data export started. Your download will begin shortly.");
  };

  const handlePartnershipAction = async (
    id: string,
    action: "approve" | "deny",
  ) => {
    if (action === "approve") {
      const request = partnershipRequests.find((r) => r._id === id);
      setSelectedRequest(request);
      setIsApproveModalOpen(true);
      return;
    }

    try {
      await adminService.handlePartnershipAction(id, action);
      const requests = await adminService.getPartnershipRequests();
      setPartnershipRequests(requests);
    } catch (err) {
      console.error(err);
      setError(`Failed to ${action} partnership request.`);
    }
  };

  const handleConfirmApproval = async () => {
    if (!selectedRequest || !approvalPassword) return;

    try {
      await adminService.handlePartnershipAction(
        selectedRequest._id,
        "approve",
        approvalPassword,
      );
      setIsApproveModalOpen(false);
      setApprovalPassword("");
      setSelectedRequest(null);

      // Refresh data
      const [requests, stats] = await Promise.all([
        adminService.getPartnershipRequests(),
        adminService.getSuperAdminStats(),
      ]);
      setPartnershipRequests(requests);
      setAdminStats(stats);

      alert("Partnership approved and agency created successfully!");
    } catch (err) {
      console.error(err);
      setError(
        "Failed to approve partnership. Please check if the email already exists.",
      );
    }
  };

  const handleDeleteAgency = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this agency? This action cannot be undone.",
      )
    ) {
      try {
        await adminService.deleteAgency(id);
        const stats = await adminService.getSuperAdminStats();
        setAdminStats(stats);
      } catch (err) {
        console.error(err);
        setError("Failed to delete agency.");
      }
    }
  };

  const handleUpdateAgency = async (id: string, data: any) => {
    try {
      await adminService.updateAgencyWithImage(id, data, agencyImageFile);
      setIsAgencyModalOpen(false);
      setAgencyImageFile(null);
      setAgencyImagePreview(null);

      // Refresh data
      const stats = await adminService.getSuperAdminStats();
      setAdminStats(stats);
      alert("Agency updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update agency. Please try again.");
    }
  };

  if (authLoading || (isLoading && !error)) {
    return (
      <div className="bg-brand-navy flex h-screen items-center justify-center">
        <Loader2 className="text-brand-red h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-bg-light min-h-screen">
      <Navbar />

      <div className="flex pt-20">
        {/* Sidebar */}
        <div className="h-[calc(100vh-80px)] w-64 border-r border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-10">
            <h2 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Main Menu
            </h2>
            <nav className="mt-4 space-y-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  activeTab === "dashboard"
                    ? "bg-brand-navy text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard size={20} />
                <span className="font-medium">Dashboard</span>
              </button>

              {user?.role === "agency" && (
                <>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      activeTab === "analytics"
                        ? "bg-brand-navy text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <BarChart3 size={20} />
                    <span className="font-medium">Analytics</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("fleet")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      activeTab === "fleet"
                        ? "bg-brand-navy text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Car size={20} />
                    <span className="font-medium">My Fleet</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      activeTab === "bookings"
                        ? "bg-brand-navy text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Calendar size={20} />
                    <span className="font-medium">Bookings</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      activeTab === "settings"
                        ? "bg-brand-navy text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                  </button>
                </>
              )}

              {user?.role === "superadmin" && (
                <>
                  <button
                    onClick={() => setActiveTab("agencies")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      activeTab === "agencies"
                        ? "bg-brand-navy text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Users size={20} />
                    <span className="font-medium">Agencies</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("applications")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      activeTab === "applications"
                        ? "bg-brand-navy text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <FileText size={20} />
                    <span className="font-medium">Applications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("audit_logs")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      activeTab === "audit_logs"
                        ? "bg-brand-navy text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Activity size={20} />
                    <span className="font-medium">Audit Logs</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("platform_config")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                      activeTab === "platform_config"
                        ? "bg-brand-navy text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Shield size={20} />
                    <span className="font-medium">Platform Settings</span>
                  </button>
                </>
              )}
            </nav>
          </div>

          <div className="absolute bottom-6 w-52">
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition-all hover:bg-red-50"
            >
              <LogOut
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />

              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-heading text-brand-navy text-3xl font-bold">
                {activeTab === "dashboard"
                  ? "Dashboard Overview"
                  : activeTab === "analytics"
                    ? "Analytics Dashboard"
                    : activeTab === "fleet"
                      ? "Fleet Management"
                      : activeTab === "bookings"
                        ? "Booking Requests"
                        : activeTab === "settings"
                          ? "Agency Settings"
                          : activeTab === "applications"
                            ? "Partnership Applications"
                            : "Network Agencies"}
              </h1>
              <p className="mt-1 text-gray-500">
                {user?.role === "superadmin"
                  ? "Master Control Panel"
                  : `${user?.name}'s Agency Dashboard`}
              </p>
            </div>

            {activeTab === "fleet" && (
              <button
                onClick={openCreateModal}
                className="bg-brand-red shadow-brand-red/20 hover:shadow-brand-red/40 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-red-700"
              >
                <Plus size={20} />
                Add New Car
              </button>
            )}

            {activeTab === "agencies" && user?.role === "superadmin" && (
              <button
                onClick={() => setIsAgencyModalOpen(true)}
                className="bg-brand-red shadow-brand-red/20 hover:shadow-brand-red/40 flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-red-700"
              >
                <Plus size={20} />
                Add Agency
              </button>
            )}
          </div>

          {error && (
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              <AlertCircle size={24} />
              <p>{error}</p>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-10">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {user?.role === "superadmin" && adminStats ? (
                  <>
                    <StatCard
                      title="Total Revenue"
                      value={`DZD ${adminStats.overall.totalRevenue.toLocaleString()}`}
                      icon={<DollarSign className="text-green-600" />}
                      trend="+12.5%"
                    />
                    <StatCard
                      title="Total Agencies"
                      value={adminStats.overall.agencyCount}
                      icon={<Briefcase className="text-blue-600" />}
                      trend="+3 active"
                    />
                    <StatCard
                      title="Registered Cars"
                      value={adminStats.overall.vehicleCount}
                      icon={<Car className="text-purple-600" />}
                      trend="+15 this month"
                    />
                    <StatCard
                      title="Total Bookings"
                      value={adminStats.overall.bookingCount}
                      icon={<TrendingUp className="text-orange-600" />}
                      trend="+8%"
                    />
                  </>
                ) : user?.role === "agency" && agencyStats ? (
                  <>
                    <StatCard
                      title="Agency Profit"
                      value={`DZD ${agencyStats.totalProfit.toLocaleString()}`}
                      icon={<DollarSign className="text-green-600" />}
                      trend="+5.2%"
                    />
                    <StatCard
                      title="My Fleet"
                      value={agencyStats.vehicleCount}
                      icon={<Car className="text-blue-600" />}
                      trend="All active"
                    />
                    <StatCard
                      title="Total Rentals"
                      value={agencyStats.bookingCount}
                      icon={<TrendingUp className="text-orange-600" />}
                      trend="+12%"
                    />
                    <StatCard
                      title="Active Listings"
                      value={vehicles.length}
                      icon={<LayoutDashboard className="text-purple-600" />}
                      trend="Verified"
                    />
                  </>
                ) : null}
              </div>

              {/* System Health Section for Superadmins */}
              {user?.role === "superadmin" && (
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-brand-navy mb-4 flex items-center gap-2 text-lg font-bold">
                    <Activity size={20} className="text-brand-red" />
                    System Health
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4">
                      <span className="text-sm font-medium text-green-700">
                        API Status
                      </span>
                      <span className="flex items-center gap-2 font-bold text-green-700">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                        Operational
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-green-50 p-4">
                      <span className="text-sm font-medium text-green-700">
                        Database
                      </span>
                      <span className="flex items-center gap-2 font-bold text-green-700">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-blue-50 p-4">
                      <span className="text-sm font-medium text-blue-700">
                        Memory Usage
                      </span>
                      <span className="font-bold text-blue-700">34%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity or Quick Charts Placeholder */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-heading text-brand-navy text-xl font-bold">
                      {user?.role === "superadmin"
                        ? "Recent Agencies"
                        : "Your Fleet"}
                    </h3>
                    <button
                      onClick={() =>
                        setActiveTab(
                          user?.role === "superadmin" ? "agencies" : "fleet",
                        )
                      }
                      className="text-brand-red text-sm font-semibold hover:text-red-700"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                        <tr>
                          {user?.role === "superadmin" ? (
                            <>
                              <th className="pb-3">Name</th>
                              <th className="pb-3">Contact</th>
                              <th className="pb-3 text-right">Revenue</th>
                            </>
                          ) : (
                            <>
                              <th className="pb-3">Vehicle</th>
                              <th className="pb-3">Status</th>
                              <th className="pb-3 text-right">Year</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {user?.role === "superadmin" && adminStats ? (
                          adminStats.agencies.slice(0, 5).map((agency) => (
                            <tr key={agency._id}>
                              <td className="text-brand-navy py-3 font-medium">
                                {agency.name}
                              </td>
                              <td className="py-3 text-gray-500">
                                {agency.email}
                              </td>
                              <td className="text-brand-green py-3 text-right font-medium">
                                DZD {agency.totalProfit.toLocaleString()}
                              </td>
                            </tr>
                          ))
                        ) : user?.role === "agency" && vehicles ? (
                          vehicles.slice(0, 5).map((vehicle) => (
                            <tr key={vehicle._id}>
                              <td className="text-brand-navy py-3 font-medium">
                                {vehicle.brand} {vehicle.model}
                              </td>
                              <td className="py-3">
                                <span
                                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                                    vehicle.availability === "available"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {vehicle.availability}
                                </span>
                              </td>
                              <td className="py-3 text-right text-gray-500">
                                {vehicle.year}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={3}
                              className="py-8 text-center text-gray-500 italic"
                            >
                              No data available yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                  <h3 className="font-heading text-brand-navy mb-6 text-xl font-bold">
                    Quick Actions
                  </h3>
                  <div className="space-y-4">
                    {user?.role === "agency" ? (
                      <>
                        <ActionItem
                          title="Add New Vehicle"
                          icon={<Plus size={18} />}
                          onClick={() => {
                            setActiveTab("fleet");
                            openCreateModal();
                          }}
                        />
                        <ActionItem
                          title="View All Bookings"
                          icon={<Calendar size={18} />}
                          onClick={() => setActiveTab("bookings")}
                        />
                        <ActionItem
                          title="Agency Settings"
                          icon={<Settings size={18} />}
                          color="bg-orange-50 text-orange-600"
                          onClick={() => setActiveTab("settings")}
                        />
                      </>
                    ) : (
                      <>
                        <ActionItem
                          title="Add New Agency"
                          icon={<Plus size={18} />}
                          onClick={() => {
                            setActiveTab("agencies");
                            setIsAgencyModalOpen(true);
                          }}
                        />
                        <ActionItem
                          title="System Revenue Report"
                          icon={<TrendingUp size={18} />}
                        />
                        <ActionItem
                          title="Platform Settings"
                          icon={<Settings size={18} />}
                          color="bg-orange-50 text-orange-600"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && <AnalyticsDashboard />}

          {activeTab === "fleet" && (
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  <tr>
                    <th className="px-6 py-4">Vehicle</th>
                    <th className="px-6 py-4">Brand & Model</th>
                    <th className="px-6 py-4">Year</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {vehicles.map((vehicle) => (
                    <tr
                      key={vehicle._id}
                      className="group transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="h-12 w-20 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={getImageUrl(vehicle.img_path)}
                            alt={vehicle.brand}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-brand-navy font-bold">
                          {vehicle.brand} {vehicle.model}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {vehicle._id}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {vehicle.year}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            vehicle.availability === "available"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {vehicle.availability.charAt(0).toUpperCase() +
                            vehicle.availability.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(vehicle)}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle._id)}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {vehicles.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-20 text-center text-gray-500"
                      >
                        No vehicles found in your fleet. Start by adding one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Search and Sort Controls */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-md flex-1">
                  <Search
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="focus:border-brand-navy focus:ring-brand-navy/5 w-full rounded-2xl border border-gray-100 bg-white py-3 pr-4 pl-12 shadow-sm focus:ring-4 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Filter className="text-gray-400" size={18} />
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="focus:border-brand-navy focus:ring-brand-navy/5 rounded-2xl border border-gray-100 bg-white py-3 pr-10 pl-4 shadow-sm focus:ring-4 focus:outline-none"
                  >
                    <option value="date_desc">Newest First</option>
                    <option value="date_asc">Oldest First</option>
                    <option value="name_asc">Name (A-Z)</option>
                  </select>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    <tr>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Dates</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {prebookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="text-brand-navy font-bold">
                            {booking.customer_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            Born:{" "}
                            {new Date(
                              booking.date_of_birth,
                            ).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {booking.phone}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {new Date(booking.start_date).toLocaleDateString()}{" "}
                            - {new Date(booking.end_date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleUpdateBookingStatus(
                                booking._id,
                                e.target.value,
                              )
                            }
                            className={`focus:ring-brand-navy/20 rounded-full border-none px-3 py-1 text-xs font-semibold focus:ring-2 ${
                              booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : booking.status === "completed"
                                    ? "bg-blue-100 text-blue-700"
                                    : booking.status === "cancelled"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="expired">Expired</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openContractModal(booking)}
                              disabled={loadingContracts[booking._id]}
                              className="bg-brand-navy hover:bg-navy-800 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all disabled:opacity-50"
                            >
                              {loadingContracts[booking._id] ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <FileText size={16} />
                              )}
                              PDF
                            </button>
                            <button
                              onClick={() =>
                                handleDeletePrebooking(booking._id)
                              }
                              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              title="Delete Request"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "audit_logs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-brand-navy text-xl font-bold">
                  System Audit Logs
                </h3>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  <Download size={18} />
                  Export Logs
                </button>
              </div>
              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    <tr>
                      <th className="px-6 py-4">Action</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Details</th>
                      <th className="px-6 py-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {auditLogs.map((log) => (
                      <tr
                        key={log._id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              log.type === "success"
                                ? "bg-green-100 text-green-700"
                                : log.type === "warning"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : log.type === "danger"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                          {log.user}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {log.details}
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "platform_config" && platformConfig && (
            <div className="max-w-4xl space-y-8">
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-brand-navy mb-6 text-xl font-bold">
                  Platform Settings
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-700">
                        Maintenance Mode
                      </p>
                      <p className="text-sm text-gray-500">
                        Temporarily disable public access to the site.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleUpdateConfig(
                          "maintenanceMode",
                          !platformConfig.maintenanceMode,
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${platformConfig.maintenanceMode ? "bg-brand-red" : "bg-gray-200"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${platformConfig.maintenanceMode ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between border-t pt-6">
                    <div>
                      <p className="font-bold text-gray-700">
                        Allow New Agencies
                      </p>
                      <p className="text-sm text-gray-500">
                        Enable or disable self-registration for new car rental
                        agencies.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleUpdateConfig(
                          "allowNewAgencies",
                          !platformConfig.allowNewAgencies,
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${platformConfig.allowNewAgencies ? "bg-green-500" : "bg-gray-200"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${platformConfig.allowNewAgencies ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                  <div className="space-y-4 border-t pt-6">
                    <label className="block font-bold text-gray-700">
                      Default Commission Rate (%)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={platformConfig.commissionRate}
                        onChange={(e) =>
                          handleUpdateConfig(
                            "commissionRate",
                            parseInt(e.target.value),
                          )
                        }
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                      <span className="text-brand-navy w-12 text-center font-bold">
                        {platformConfig.commissionRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-brand-navy text-xl font-bold">
                  New Partnership Requests
                </h3>
                <div className="text-sm text-gray-500">
                  {
                    partnershipRequests.filter((r) => r.status === "pending")
                      .length
                  }{" "}
                  pending applications
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {partnershipRequests.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center text-gray-500">
                    No partnership applications found.
                  </div>
                ) : (
                  partnershipRequests.map((request) => (
                    <div
                      key={request._id}
                      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col justify-between gap-6 md:flex-row">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-brand-navy/5 rounded-2xl p-3">
                              <Building2
                                className="text-brand-navy"
                                size={24}
                              />
                            </div>
                            <div>
                              <h4 className="text-brand-navy text-lg font-bold">
                                {request.agencyName}
                              </h4>
                              <p className="text-xs text-gray-400">
                                Received{" "}
                                {new Date(
                                  request.timestamp,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : request.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {request.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Mail size={16} className="text-gray-400" />{" "}
                              {request.email}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone size={16} className="text-gray-400" />{" "}
                              {request.phone}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 md:col-span-2">
                              <MapPin size={16} className="text-gray-400" />{" "}
                              {request.address}
                            </div>
                          </div>

                          <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600 italic">
                            "{request.description}"
                          </div>
                        </div>

                        {request.status === "pending" && (
                          <div className="flex shrink-0 justify-center gap-3 md:flex-col">
                            <button
                              onClick={() =>
                                handlePartnershipAction(request._id, "approve")
                              }
                              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition-all hover:bg-green-700"
                            >
                              <Check size={18} /> Approve
                            </button>
                            <button
                              onClick={() =>
                                handlePartnershipAction(request._id, "deny")
                              }
                              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-bold text-red-600 transition-all hover:bg-red-100"
                            >
                              <Ban size={18} /> Deny
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="max-w-4xl space-y-8">
              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-brand-navy mb-6 text-xl font-bold">
                  Agency Information
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Agency Name
                    </label>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 font-medium text-gray-700">
                      {user?.name || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Primary Email
                    </label>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 font-medium text-gray-700">
                      {user?.email || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Account Status
                    </label>
                    <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 font-medium text-green-600">
                      <div className="h-2 w-2 rounded-full bg-green-600"></div>
                      Verified Agency
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Member Since
                    </label>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 font-medium text-gray-700">
                      January 2024
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-brand-navy mb-6 text-xl font-bold">
                  Danger Zone
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  Once you delete your agency account, there is no going back.
                  Please be certain.
                </p>
                <button className="rounded-xl border border-red-200 px-6 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50">
                  Deactivate Agency Account
                </button>
              </div>
            </div>
          )}

          {activeTab === "agencies" && adminStats && (
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  <tr>
                    <th className="px-6 py-4">Agency</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Fleet</th>
                    <th className="px-6 py-4">Revenue</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {adminStats.agencies
                    .filter(
                      (agency) =>
                        agency.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        agency.email
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                    )
                    .map((agency) => (
                      <tr
                        key={agency._id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="text-brand-navy font-bold">
                            {agency.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {agency.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                              agency.vehicleCount > 5
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            <Shield size={12} />
                            {agency.vehicleCount > 5 ? "Verified" : "Regular"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          <div className="text-sm font-medium">
                            {agency.vehicleCount} cars
                          </div>
                          <div className="text-xs text-gray-400">
                            {agency.bookingCount} bookings
                          </div>
                        </td>
                        <td className="text-brand-green px-6 py-4 font-bold">
                          DZD {agency.totalProfit.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setCurrentAgency({
                                  _id: agency._id,
                                  email: agency.email,
                                  name: agency.name,
                                  phone: "",
                                  address: "",
                                  img_path: "",
                                });
                                setIsAgencyModalOpen(true);
                                setIsEditing(true);
                              }}
                              className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                              title="Edit Agency"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteAgency(agency._id)}
                              className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                              title="Delete Agency"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Car Form Modal */}
      {isModalOpen && (
        <div className="bg-brand-navy/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-brand-navy text-2xl font-bold">
                {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCar.brand}
                    onChange={(e) =>
                      setCurrentCar({ ...currentCar, brand: e.target.value })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="e.g. BMW"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Model
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCar.model}
                    onChange={(e) =>
                      setCurrentCar({ ...currentCar, model: e.target.value })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="e.g. M4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={currentCar.category || ""}
                    onChange={(e) =>
                      setCurrentCar({ ...currentCar, category: e.target.value })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="SUV">SUV</option>
                    <option value="Berline">Berline</option>
                    <option value="Cabriolet">Cabriolet</option>
                    <option value="Sport">Sport</option>
                    <option value="Compact">Compact</option>
                    <option value="Minivan">Minivan</option>
                  </select>
                </div>
                <div className="space-y-2 flex items-end pb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentCar.is_luxury || false}
                      onChange={(e) =>
                        setCurrentCar({ ...currentCar, is_luxury: e.target.checked })
                      }
                      className="w-5 h-5 accent-[#C8102E] border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Luxury Vehicle</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCar.year}
                    onChange={(e) =>
                      setCurrentCar({ ...currentCar, year: e.target.value })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="2026"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Price (DZD/day)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={currentCar.price ?? ""}
                    onChange={(e) =>
                      setCurrentCar({
                        ...currentCar,
                        price:
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="e.g. 12000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Fuel
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCar.specs?.fuel || ""}
                    onChange={(e) =>
                      setCurrentCar({
                        ...currentCar,
                        specs: {
                          fuel: e.target.value,
                          transmission: currentCar.specs?.transmission || "",
                          seats: currentCar.specs?.seats,
                        },
                      })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="e.g. Petrol"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Transmission
                  </label>
                  <input
                    type="text"
                    required
                    value={currentCar.specs?.transmission || ""}
                    onChange={(e) =>
                      setCurrentCar({
                        ...currentCar,
                        specs: {
                          fuel: currentCar.specs?.fuel || "",
                          transmission: e.target.value,
                          seats: currentCar.specs?.seats,
                        },
                      })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="e.g. Automatic"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Seats
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={currentCar.specs?.seats ?? ""}
                    onChange={(e) =>
                      setCurrentCar({
                        ...currentCar,
                        specs: {
                          fuel: currentCar.specs?.fuel || "",
                          transmission: currentCar.specs?.transmission || "",
                          seats:
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value),
                        },
                      })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <select
                    value={currentCar.availability}
                    onChange={(e) =>
                      setCurrentCar({
                        ...currentCar,
                        availability: e.target.value,
                      })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                  >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Vehicle Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleVehicleImageChange}
                  className="focus:border-brand-red file:bg-brand-navy hover:file:bg-brand-navy/90 w-full rounded-xl border border-gray-200 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:outline-none"
                />
                {vehicleImagePreview && (
                  <div className="mt-2">
                    <img
                      src={vehicleImagePreview}
                      alt="Preview"
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  </div>
                )}
                {!vehicleImagePreview && currentCar.img_path && (
                  <div className="mt-2">
                    <img
                      src={getImageUrl(currentCar.img_path)}
                      alt="Current"
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-brand-navy hover:bg-navy-800 w-full rounded-xl py-4 font-bold text-white transition-all"
              >
                {isEditing ? "Update Vehicle" : "Create Vehicle"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Agency Form Modal */}
      {isAgencyModalOpen && (
        <div className="bg-brand-navy/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-heading text-brand-navy text-2xl font-bold">
                {isEditing ? "Edit Agency" : "Add New Agency"}
              </h2>
              <button
                onClick={() => {
                  setIsAgencyModalOpen(false);
                  setIsEditing(false);
                  setCurrentAgency((prev) => ({ ...prev, _id: undefined }));
                }}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isEditing && (currentAgency as any)._id) {
                  handleUpdateAgency((currentAgency as any)._id, currentAgency);
                } else {
                  handleCreateAgency(e);
                }
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  User Email (Must exist)
                </label>
                <input
                  type="email"
                  required
                  value={currentAgency.email}
                  onChange={(e) =>
                    setCurrentAgency({
                      ...currentAgency,
                      email: e.target.value,
                    })
                  }
                  className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                  placeholder="user@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Agency Name
                </label>
                <input
                  type="text"
                  required
                  value={currentAgency.name}
                  onChange={(e) =>
                    setCurrentAgency({ ...currentAgency, name: e.target.value })
                  }
                  className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                  placeholder="Luxury Cars LLC"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={currentAgency.phone}
                    onChange={(e) =>
                      setCurrentAgency({
                        ...currentAgency,
                        phone: e.target.value,
                      })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={currentAgency.address}
                    onChange={(e) =>
                      setCurrentAgency({
                        ...currentAgency,
                        address: e.target.value,
                      })
                    }
                    className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Agency Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAgencyImageChange}
                  className="focus:border-brand-red file:bg-brand-navy hover:file:bg-brand-navy/90 w-full rounded-xl border border-gray-200 px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:outline-none"
                />
                {agencyImagePreview && (
                  <div className="mt-2">
                    <img
                      src={agencyImagePreview}
                      alt="Preview"
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-brand-navy hover:bg-navy-800 w-full rounded-xl py-4 font-bold text-white transition-all"
              >
                Create Agency
              </button>
            </form>
          </div>
        </div>
      )}
      {isApproveModalOpen && (
        <div className="bg-brand-navy/60 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-brand-navy text-2xl font-bold">
                  Approve Partnership
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Assign a temporary password for the new agency.
                </p>
              </div>
              <button
                onClick={() => setIsApproveModalOpen(false)}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="text-sm font-semibold text-gray-700">
                  {selectedRequest?.agencyName}
                </div>
                <div className="text-xs text-gray-500">
                  {selectedRequest?.email}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Initial Password
                </label>
                <input
                  type="password"
                  required
                  value={approvalPassword}
                  onChange={(e) => setApprovalPassword(e.target.value)}
                  className="focus:border-brand-red w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsApproveModalOpen(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmApproval}
                  disabled={!approvalPassword || approvalPassword.length < 6}
                  className="bg-brand-navy hover:bg-navy-800 flex-1 rounded-xl py-3 font-semibold text-white transition-colors disabled:opacity-50"
                >
                  Confirm & Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ContractGenerationModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        onGenerate={handleGenerateContract}
        isLoading={false}
        prebooking={selectedPrebooking}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <div className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl">
    <div className="mb-4 flex items-center justify-between">
      <div className="group-hover:bg-brand-red/10 rounded-2xl bg-gray-50 p-3 transition-colors">
        {icon}
      </div>
      <div
        className={`flex items-center gap-1 text-xs font-bold ${trend.startsWith("-") ? "text-red-500" : "text-green-500"}`}
      >
        {trend.startsWith("-") ? (
          <TrendingDown size={14} />
        ) : (
          <TrendingUp size={14} />
        )}
        {trend}
      </div>
    </div>
    <div className="text-sm font-medium text-gray-500">{title}</div>
    <div className="text-brand-navy mt-1 text-2xl font-bold">{value}</div>
  </div>
);

interface ActionItemProps {
  title: string;
  icon: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  title,
  icon,
  color = "bg-blue-50 text-blue-600",
  onClick,
}) => (
  <button
    onClick={onClick}
    className="group flex w-full items-center justify-between rounded-2xl p-4 transition-all hover:bg-gray-50"
  >
    <div className="flex items-center gap-4">
      <div className={`rounded-xl p-2 ${color}`}>{icon}</div>
      <span className="font-semibold text-gray-700">{title}</span>
    </div>
    <ChevronRight
      size={18}
      className="group-hover:text-brand-navy text-gray-300 transition-all group-hover:translate-x-1"
    />
  </button>
);

export default AdminPanel;
