import useFetchUser from "@/hooks/useFetchUser";
import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";

interface navbar {
  setOpenModal: (nilai: boolean) => void;
}

const DashboardNavbar: React.FC<navbar> = ({ setOpenModal }) => {
  const handleNotificationModal = (open: boolean) => {
    setOpenModal(true);
    console.log(open);
  };

  const [nama, setNama] = useState("");
  const { user } = useFetchUser();

  useEffect(() => {
    if (user) {
      setNama(user.name);
    }
  }, [user]);

  return (
    <div className="ml-64 w-full">
      <Navbar className="fixed top-0 left-64 w-[calc(100%-16rem)] bg-white shadow-md z-50">
        <h1 className="text-2xl font-bold">Selamat Datang {nama}</h1>
        <div className="flex md:order-2 gap-2">
          <div
            className="w-12 h-12 flex items-center justify-center relative cursor-pointer"
            onClick={() => handleNotificationModal(true)}
          >
            <IoIosNotifications size={30} />
            <div className="w-6 h-6 text-center bg-pink-400 rounded-full absolute top-0 right-0">
              1
            </div>
          </div>
          <DarkThemeToggle />
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
    </div>
  );
};

export default DashboardNavbar;
