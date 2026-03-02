type Props = {
  count: number;
};

export default function SessionCounter({ count }: Props) {
  return (
    <div className="mt-4 text-center text-white  text-sm">
      Hoàn thành: {count} vòng
    </div>
  );
}