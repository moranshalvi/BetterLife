import { HomePage } from "./pages/home-page";
import { Login } from "./pages/login-page";
import { Signup } from "./pages/signup-page";
import { Registration } from "./pages/registration-page";
import { FindHelpPage } from "./pages/find-help-page";
import { PatientHomePage } from "./pages/patient-home-page";
import { TherapistHomePage } from "./pages/therapist-home-page";
import { AdminHomePage } from "./pages/admin-home-page";
import { AddAdmin } from "./pages/add-admins-page";
import { AdminsConfirmationPage } from "./pages/admins-confirmation-page";
import { RemoveUsers } from "./pages/remove-user-page";
import { UploadMoreDiplomas } from "./pages/upload_more_diplomas-page";
import { Breathe } from "./video/breathe-page";
import { Hands } from "./video/hands-page";
import { Sea } from "./video/sea-page"
import { Neck } from "./video/neck-page"
import { MedicalCard } from "./pages/medical-card-page";

export default [
  {
    path: "/medicalCard",
    element: <MedicalCard />,
  },
  {
    path: "/neck",
    element: <Neck />,
  },
  {
    path: "/sea",
    element: <Sea />,
  },
  {
    path: "/hands",
    element: <Hands />,
  },
  {
    path: "/breathe",
    element: <Breathe />,
  },
  {
    path: "/uploadMoreDiplomas",
    element: <UploadMoreDiplomas />,
  },
  {
    path: "/removeUsers",
    element: <RemoveUsers />,
  },
  {
    path: "/adminsConfirmationPage",
    element: <AdminsConfirmationPage />,
  },
  {
    path: "/addAdmin",
    element: <AddAdmin />,
  },
  {
    path: "/findHelp",
    element: <FindHelpPage />,
  },
  {
    path: "/signup/:userType",
    element: <Signup />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/patientHomePage",
    element: <PatientHomePage />,
  },
  {
    path: "/therapistHomePage",
    element: <TherapistHomePage />,
  },
  {
    path: "/adminHomePage",
    element: <AdminHomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
];
