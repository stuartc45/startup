export default function DeviceStatus({ multiDevice }) {
  if (!multiDevice) return null;

  return (
    <div className="alert alert-info text-center mt-2">
      Another device is connected to your account.
    </div>
  );
}