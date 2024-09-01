import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  channelPartnerCode: yup.string().required("Channel Partner Code is required"),
  leadName: yup.string().required("Lead Name is required"),
  contactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Contact Number must be 10 digits")
    .required("Contact Number is required"),
  emailId: yup
    .string()
    .email("Invalid email format")
    .required("Email ID is required"),
  leadSource: yup.string().required("Lead Source is required"),
  leadInterest: yup.string().required("Lead Interest is required"),
  additionalNotes: yup.string(),
});

const LeadForm = ({ onLogout }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to submit a lead.");
        return;
      }

      await axios.post("http://localhost:5000/api/leads", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Lead submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Failed to submit lead. Please try again.");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center md:justify-between flex-wrap gap-4 items-center mb-4">
        <button
          onClick={() => handleNavigation("/lead-dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Lead Dashboard
        </button>
        <button
          onClick={() => handleNavigation("/dashboard")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300"
        >
          Dashboard
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          Submit a New Lead
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-3"
        >
          <div>
            <label className="block text-gray-700 font-medium">
              Channel Partner Code
            </label>
            <input
              {...register("channelPartnerCode")}
              className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.channelPartnerCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.channelPartnerCode?.message}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Lead Name</label>
            <input
              {...register("leadName")}
              className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.leadName ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.leadName?.message}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Contact Number
            </label>
            <input
              {...register("contactNumber")}
              className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contactNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.contactNumber?.message}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email ID</label>
            <input
              {...register("emailId")}
              className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.emailId ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.emailId?.message}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Lead Source
            </label>
            <div className="relative">
              <select
                {...register("leadSource")}
                className={`block w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.leadSource ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="Social Media">Social Media</option>
                <option value="Referral">Referral</option>
                <option value="Website">Website</option>
              </select>
              <RiArrowDropDownLine className="absolute right-2 top-2 pointer-events-none h-5 w-5 text-gray-500" />
            </div>
            <p className="text-red-500 text-sm mt-1">
              {errors.leadSource?.message}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Lead Interest
            </label>
            <input
              {...register("leadInterest")}
              className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.leadInterest ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.leadInterest?.message}
            </p>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">
              Additional Notes
            </label>
            <textarea
              {...register("additionalNotes")}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div className="flex justify-center col-span-2">
            <button
              type="submit"
              className="bg-blue-600 mt-2.5 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
