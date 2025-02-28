import React, { useState, useEffect } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";

// Define validation schema
const formSchema = z.object({
  firstname: z.string().min(2).max(50).nonempty(),
  middlename: z.string().min(2).max(50).nonempty(),
  lastname: z.string().min(2).max(50).nonempty(),
  sex: z.enum(["Male", "Female"]),
  civilstatus: z.enum(["Single", "Married", "Widowed", "Divorced"]),
  birthdate: z.string().nonempty(),
  age: z.number().nonnegative(),
  houseStreetSubdivision: z.string().min(5).max(100).nonempty(),
  barangay: z.string().min(2).max(50).nonempty(),
  city: z.string().min(2).max(50).nonempty(),
  province: z.string().min(2).max(50).nonempty(),
  region: z.string().min(2).max(50).nonempty(),
  cellphone: z.string().min(11).max(11).nonempty().startsWith("09"),
  emergencyContact: z.string().min(2).max(50).nonempty(),
  emergencyNumber: z.string().min(10).max(15).nonempty(),
  relationship: z.string().min(2).max(50).nonempty(),
});

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      sex: "Male" as "Male" | "Female",
      civilstatus: "Single" as "Single" | "Married" | "Widowed" | "Divorced",
      birthdate: "",
      age: 0,
      houseStreetSubdivision: "",
      barangay: "",
      city: "",
      province: "",
      region: "",
      cellphone: "",
      emergencyContact: "",
      emergencyNumber: "",
      relationship: "",
    },
  });

  type LocationDataType = {
    [region: string]: {
      region_name: string;
      province_list: {
        [province: string]: {
          municipality_list: {
            [city: string]: {
              barangay_list: string[];
            };
          };
        };
      };
    };
  };

  type RegionDataType = {
    region_name: string;
    province_list: {
      [province: string]: {
        municipality_list: {
          [city: string]: {
            barangay_list: string[];
          };
        };
      };
    };
  }

  type ProvinceDataType = {
    [province_name: string]: {
      municipality_list: {
        [city: string]: {
          barangay_list: string[];
        };
      };
    };
  }

  type CityDataType = {
    [city: string]: {
      barangay_list: string[];
    };
  }

  const [locationData, setLocationData] = useState<LocationDataType>({});
  const [provinces, setProvinces] = useState<ProvinceDataType | null>(null);
  const [cities, setCities] = useState<CityDataType | null>(null);
  const [barangays, setBarangays] = useState<string[]>([]);

  const birthdate = form.watch("birthdate");
  const selectedProvince = form.watch("province");
  const selectedCity = form.watch("city");
  const selectedRegion = form.watch("region");

  // Load JSON file from public folder
  useEffect(() => {
    fetch("/philippine_provinces_cities_municipalities_and_barangays_2019v2.json")
      .then((res) => res.json())
      .then((data) => setLocationData(data))
      .catch((err) => console.error("Error loading location data:", err));
  }, []);

  // Extract region names
  const regionNames = Object.keys(locationData);

  // Filter provinces when region changes
  useEffect(() => {
    if (!selectedRegion || !locationData[selectedRegion]) {
      setProvinces(null);
      setCities(null);
      setBarangays([]);
      return;
    }
    setProvinces(locationData[selectedRegion].province_list);
  }, [selectedRegion, locationData]);

  // Filter cities when province changes
  useEffect(() => {
    if (!selectedProvince || !provinces || !provinces[selectedProvince]) {
      setCities(null);
      setBarangays([]);
      return;
    }
    setCities(provinces[selectedProvince].municipality_list);
  }, [selectedProvince, provinces]);

  // Filter barangays when city changes
  useEffect(() => {
    if (!selectedCity || !cities || !cities[selectedCity]) {
      setBarangays([]);
      return;
    }
    setBarangays(cities[selectedCity].barangay_list);
  }, [selectedCity, cities]);


  const calculateAge = (birthdate: string) => {
    if (!birthdate) return 0;
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    form.setValue("age", calculateAge(birthdate));
  }, [birthdate, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <div className="w-[60%] bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-red-900">Patient Registration</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <fieldset className="border p-4 rounded-lg">
              <legend className="text-xl font-bold text-green-900">Personal Information</legend>
              
              {/* Name */}
              <div className="flex gap-4 mb-4">
                <FormField control={form.control} name="firstname" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="middlename" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="lastname" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              {/* Other Fields */}
              <div className="flex gap-4 mb-4">
                <FormField control={form.control} name="sex" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Sex</FormLabel>
                    <FormControl>

                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>

                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="civilstatus" render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Civil Status</FormLabel>
                      <FormControl>

                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Single" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Single">Single</SelectItem>
                            <SelectItem value="Married">Married</SelectItem>
                            <SelectItem value="Widowed">Widowed</SelectItem>
                            <SelectItem value="Divorced">Divorced</SelectItem>
                          </SelectContent>
                        </Select>

                      </FormControl>
                    </FormItem>
                  )} />
                <FormField control={form.control} name="cellphone" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              {/* Birthdate & Age */}
              <div className="flex gap-4 mb-4">
                <FormField control={form.control} name="birthdate" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Birthdate</FormLabel>
                    <FormControl>

                      <DatePicker 
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => {
                          form.setValue("birthdate", date.toISOString().split("T")[0]);
                          form.setValue("age", calculateAge(date.toISOString().split("T")[0]));
                        }}
                      />

                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input value={field.value} readOnly className="bg-gray-100 cursor-not-allowed" />
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              {/* Address Fields */}
              <FormLabel>Address</FormLabel>
              <div className="flex gap-2 flex-wrap mt-2 mb-2">
                <FormField control={form.control} name="houseStreetSubdivision" render={({ field }) => (
                  <FormItem className="flex-1 min-w-[200px]">
                    <FormControl>
                      <Input {...field} placeholder="House No. / Street / Subdivision" />
                    </FormControl>
                  </FormItem>
                )} />
                
              </div>

              <div className="flex gap-2 flex-wrap mt-2 mb-2">
                {/* Region Dropdown */}
                <FormField control={form.control} name="region" render={({ field }) => (
                  <FormItem className="flex-1 min-w-[150px]">
                    <FormControl>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(locationData).map((regionKey) => (
                          <SelectItem key={regionKey} value={regionKey}>
                            {locationData[regionKey].region_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    </FormControl>
                  </FormItem>
                )} />

                {/* Province Dropdown */}
                <FormField control={form.control} name="province" render={({ field }) => (
                  <FormItem className="flex-1 min-w-[150px]">
                    <FormControl>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedRegion && provinces && Object.keys(provinces).map((provinceKey) => (
                          <SelectItem key={provinceKey} value={provinceKey}>
                            {provinceKey
                              .toLowerCase() // Ensure all letters are lowercase first
                              .split(" ") // Split into words
                              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
                              .join(" ") // Join words back together
                              } 
                          </SelectItem>
                        
                        ))}
                      </SelectContent>
                    </Select>

                    </FormControl>
                  </FormItem>
                )} />

                {/* City Dropdown */}
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem className="flex-1 min-w-[150px]">
                    <FormControl>

                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedRegion && selectedProvince && cities && Object.keys(cities).map((cityKey) => (
                            <SelectItem key={cityKey} value={cityKey}>
                              {cityKey
                              .toLowerCase() // Ensure all letters are lowercase first
                              .split(" ") // Split into words
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
                              .join(" ") // Join words back together
                              } 
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                    </FormControl>
                  </FormItem>
                )} />

                {/* Barangay Dropdown */}
                <FormField control={form.control} name="barangay" render={({ field }) => (
                  <FormItem className="flex-1 min-w-[150px]">
                    <FormControl>
                      
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Barangay" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedRegion && selectedProvince && selectedCity && barangays && Object.keys(barangays).map((barangay) => (
                            <SelectItem key={barangay} value={barangay}>
                              {barangay}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                    </FormControl>
                  </FormItem>
                )} />
              </div>

            </fieldset>

            {/* Emergency Contact Person */}
            <fieldset className="border p-4 rounded-lg">
              <legend className="text-xl font-bold text-green-900">Emergency Contact Person</legend>
              <div className="flex gap-4">
                <FormField control={form.control} name="emergencyContact" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="emergencyNumber" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Contact Number" />
                    </FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="relationship" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Relationship (e.g., Mother)" />
                    </FormControl>
                  </FormItem>
                )} />
              </div>
            </fieldset>


            <div className="flex justify-end">
              <Button type="submit" className="bg-green-900 hover:bg-red-900 cursor-pointer text-white">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ProfileForm;