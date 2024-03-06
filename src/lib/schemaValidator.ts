import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const SignUpSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    surname: z.string().min(2, "Surname is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.name !== data.surname, {
    message: "Name and surname cannot be the same",
    path: ["surname"],
  })
  .refine((data) => data.password.length > 8, {
    message: "Password must be at least 8 characters",
  });
/*   .refine(
    (data) => {
      const re = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
      );
      return re.test(data.password);
    },
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      path: ["password"],
    },
  );
  */

export type SignUpType = z.infer<typeof SignUpSchema>;
export type SignInType = z.infer<typeof SignInSchema>;

const IdentityType = ["PASSPORT", "NATIONAL_ID"] as const;

export const ApplicantDetailsSchema = z
  .object({
    name: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .min(1, "First name is required"),

    surname: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(1, "Last name is required"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid email",
      })
      .email({
        message: "Enter a valid email",
      })
      .min(1, "Email is required"),

    identityType: z.enum(IdentityType).optional(),
    identificationNumber: z.string({
      invalid_type_error: "Identification Number must be Numbers",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.identityType === "NATIONAL_ID" && !data.identificationNumber) {
      ctx.addIssue({
        path: ["identificationNumber"],
        message: "Identification Number is required ",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.identityType === "PASSPORT" && !data.identificationNumber) {
      ctx.addIssue({
        path: ["identificationNumber"],
        message: "Passport Number is required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.identityType === "NATIONAL_ID" && data.identificationNumber) {
      const re = new RegExp("^[0-9]{13}$");
      if (!re.test(data.identificationNumber)) {
        ctx.addIssue({
          path: ["identificationNumber"],
          message: "ID Number must be 13 digits",
          code: z.ZodIssueCode.custom,
        });
      }
    }
    if (data.identityType === "PASSPORT" && data.identificationNumber) {
      const re = new RegExp("^[A-Z0-9]{9}$");
      if (!re.test(data.identificationNumber)) {
        ctx.addIssue({
          path: ["identificationNumber"],
          message: "Passport Number must be 9 characters",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
export type ApplicantDetailsType = z.infer<typeof ApplicantDetailsSchema>;

export const currencyOptions = ["USD", "EUR", "JPY", "ZAR"] as const;

export const PropertySchema = z
  .object({
    currency: z.enum(currencyOptions),
    address: z.string().min(1, "Address is required"),
    type: z.string().min(1, "Property type is required"),
    other: z.string().optional(),

    value: z.coerce
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .nonnegative("Amount must be a positive number"),
    financingInstitution: z
      .string()
      .min(1, "Financing Institution is required"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "Other" && !data.other) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide the other property type",
        path: ["other"],
      });
    }
  });

export type PropertyType = z.infer<typeof PropertySchema>;

export const organization_type = ["BANK"] as const;
export const OrganizationSchema = z.object({
  name: z.string().min(1, { message: "Organization name is required" }),
  orgType: z.enum(organization_type),
  abbreviation: z
    .string()
    .min(1, { message: "Organization abbreviation is required" })
    .max(10, { message: "Organization abbreviation is too long" }),
});

export type OrganizationType = z.infer<typeof OrganizationSchema>;

export const ACCOUNT_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;

export const AdminSchema = z.object({
  name: z.string().min(2, "Name is required"),
  surname: z.string().min(2, "Surname is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(ACCOUNT_ROLES),
  organization: z.string().min(1, "Organization is required"),
});

export type AdminSchemaType = z.infer<typeof AdminSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export const NewPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
