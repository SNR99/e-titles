import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import FormError from "./form-error";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const libraries: Libraries = ["places"];

interface SearchBoxProps {
  onSelectAddress: ({
    address,
    longitude,
    latitude,
  }: {
    address: string;
    longitude: number | null;
    latitude: number | null;
  }) => void;
  defaultValue: string;
}
export default function SearchBox({
  onSelectAddress,
  defaultValue,
}: SearchBoxProps) {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError)
    return (
      <FormError message="Error loading google places, try reloading the page" />
    );

  return (
    <ReadySearchBox
      onSelectAddress={onSelectAddress}
      defaultValue={defaultValue}
    />
  );
}

function ReadySearchBox({ onSelectAddress, defaultValue }: SearchBoxProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
    defaultValue,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      onSelectAddress({
        address: "",
        longitude: null,
        latitude: null,
      });
    }
  };

  const handleSelect = async (address: string) => {
    console.log(address);
  };

  console.log(status, data);

  return <></>;
}
