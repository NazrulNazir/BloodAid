"use client";
import { authClient } from "@/lib/auth-client";
// import SigninGoogle from "@/components/SigninGoogle";
import {
  Button,
  Description,
  FieldError,
  Input,
  Label,
  ListBox,
  TextField,
  Select,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { getDistrict, getUpazila } from "@/lib/api";
// import { toast } from 'react-toastify';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other"];

const RegisterPage = () => {
  const fileInputRef = useRef(null);
  //data
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [allUpazilas, setAllUpazilas] = useState([]);

  const router = useRouter();
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errPass, setErrPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // image bb image upload State
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  //  const [errPass, setErrPass] = useState("");

  useEffect(() => {
    const districtFUn = async () => {
      const district = await getDistrict();
      setDistricts(district);

      const upazila = await getUpazila();
      setAllUpazilas(upazila);
    };
    districtFUn();
  }, []);

  // const filteredUpazilas = upzla.filter(
  //   (upazila) => upazila.district_id === Number(districts.map((d) => d.id)),
  // );
  // console.log(filteredUpazilas);
  // setUpazilas(filteredUpazilas);

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasMinLength && hasUpper && hasNumber;
  };

  // Image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    if (!image) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Form Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    console.log("Form Data:", userData);

    setErrPass("");

    if (!validatePassword(userData.password)) {
      setErrPass("Password must be 8+ chars, 1 uppercase letter and 1 number");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setErrPass("Passwords do not match");
      return;
    }

    if (!bloodGroup) {
      toast.error("Please select a blood group");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: imageUrl,
      district: userData.district,
      upazila: userData.upazila,
      role: userData.role,
      bloodGroup: userData.bloodGroup,
      // callbackURL: "/login",
    });
    console.log(data);
    if (data) {
      toast.success("Create account Successfullly");
      // router.push("/login");
    }

    if (error) {
      toast.error("Signup Failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="hero w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <div className=" w-full">
          <div className="card-body">
            <form action="" onSubmit={onSubmit}>
              <h1 className="text-4xl font-bold text-center text-red-500 mb-5">
                Register
              </h1>
              {/* <SigninGoogle></SigninGoogle> */}
              {/* Image Upload */}
              <div className="flex flex-col items-center mb-5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="relative">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-25 h-25 rounded-full bg-orange-50 border-4 border-white shadow-md flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0"
                        />
                      </svg>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border"
                  >
                    <FaCamera className="text-gray-500 text-sm" />
                  </button>
                </div>

                <p className="mt-2 text-md font-bold text-gray-700">
                  Profile Photo
                </p>
              </div>

              <fieldset className="fieldset flex flex-col gap-3 px-3">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    {/* Name  */}
                    <TextField isRequired className="w-full" name="name">
                      <Label>Full Name</Label>
                      <Input placeholder="John Doe" />
                      {/* <Description>This field is required</Description> */}
                    </TextField>
                  </div>
                  {/* Email */}
                  <TextField
                    isRequired
                    className="w-full"
                    name="email"
                    type="email"
                  >
                    <Label>Email</Label>
                    <Input placeholder="user@example.com" />
                  </TextField>
                </div>

                {/* Upozila and Discrict */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Role */}
                  <div>
                    <Select
                      isRequired
                      selectedKey={role}
                      onSelectionChange={(key) => setRole(String(key))}
                    >
                      <Label>Role</Label>

                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item key="Donor" id="Donor">
                            Donor
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                    <input type="hidden" name="role" value={role} />
                  </div>

                  {/* District */}
                  <div>
                    <Select
                      selectedKeys={selectedDistrict ? [selectedDistrict] : []}
                      onSelectionChange={(key) => {
                        const districtId = String(key);

                        setSelectedDistrict(districtId);

                        const districtObj = districts.find(
                          (d) => String(d.id) === districtId,
                        );

                        setDistrict(districtObj?.name || "");

                        const filteredUpazilas = allUpazilas.filter(
                          (u) => Number(u.district_id) === Number(districtId),
                        );

                        setUpazilas(filteredUpazilas);

                        setSelectedUpazila("");
                        setUpazila("");
                      }}
                    >
                      <Label>District</Label>

                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {districts.map((d) => (
                            <ListBox.Item key={d.id} id={d.id}>
                              {d.name}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                    <input type="hidden" name="district" value={district} />
                  </div>

                  {/* Upazila */}
                  <div>
                    <Select
                      selectedKeys={selectedUpazila ? [selectedUpazila] : []}
                      onSelectionChange={(key) => {
                        const upazilaId = String(key);

                        setSelectedUpazila(upazilaId);

                        const upazilaObj = upazilas.find(
                          (u) => String(u.id) === upazilaId,
                        );

                        setUpazila(upazilaObj?.name || "");
                      }}
                    >
                      <Label>Upazila</Label>

                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {upazilas.map((u) => (
                            <ListBox.Item key={u.id} id={u.id}>
                              {u.name}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                    <input type="hidden" name="upazila" value={upazila} />
                  </div>
                </div>

                {/* Blood Group */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Blood Group
                  </label>

                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {bloodGroups.map((group) => (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setBloodGroup(group)}
                        className={`h-12 rounded-lg border text-sm font-semibold transition-all
                        ${
                          bloodGroup === group
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-white border-gray-200 hover:border-red-400"
                        }
                      `}
                      >
                        {group}
                      </button>
                    ))}
                  </div>

                  <input
                    required
                    type="hidden"
                    name="bloodGroup"
                    value={bloodGroup}
                  />
                </div>

                {/* Password Area  */}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label mb-2 text-gray-700">Password</label>

                    <div className="relative w-full max-w-sm">
                      <TextField
                        isRequired
                        name="password"
                        type={showPassword ? "text" : "password"}
                      >
                        <Input
                          // name="password"
                          placeholder="Enter your password"
                          className="pr-12"
                          required
                        />

                        <FieldError />
                      </TextField>
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[48%] -translate-y-1/2 cursor-pointer text-gray-500 z-10 text-lg"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="label mb-2 text-gray-700">
                      Confirm Password
                    </label>

                    <div className="relative w-full max-w-sm">
                      <TextField
                        isRequired
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                      >
                        <Input
                          // name="confirmPassword"
                          placeholder="Confirm Password"
                          className="pr-12"
                          required
                        />
                        <FieldError />
                      </TextField>
                      <span
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-[48%] -translate-y-1/2 cursor-pointer text-gray-500 z-10 text-lg"
                      >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                </div>
                <Description>
                  {errPass && (
                    <p className="text-red-600 font-semibold mt-0">{errPass}</p>
                  )}
                </Description>

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <Button
                  type="submit"
                  className="btn bg-red-500 rounded-lg w-full text-white mt-4 text-lg font-semibold"
                >
                  Register
                </Button>
                <p className="text-md">
                  have an account?{" "}
                  <Link
                    className="text-red-500 font-bold underline"
                    href={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
