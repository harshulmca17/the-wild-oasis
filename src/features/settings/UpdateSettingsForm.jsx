import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakFastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isLoading) return <Spinner />;
  function handleUpdate(e, type) {
    const { value } = e.target;
    const tempObj = {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakFastPrice,
    };
    if (!value || parseInt(tempObj[type]) === parseInt(value)) return;

    updateSetting({ ...tempObj, [type]: parseInt(value) });

    console.log(value, tempObj);
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => {
            handleUpdate(e, "minBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => {
            handleUpdate(e, "maxBookingLength");
          }}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => {
            handleUpdate(e, "maxGuestsPerBooking");
          }}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          disabled={isUpdating}
          onBlur={(e) => {
            handleUpdate(e, "breakFastPrice");
          }}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
