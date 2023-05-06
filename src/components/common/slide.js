import Link from "next/link"; 

export default function Slide(props) {
    return (
      <Link href={props.url} target={`${props.url !== "" ? "_blank" : ""}`}>
        <div
          className="pb-[50%] md:pb-[35%] bg-cover bg-center"
          style={{ backgroundImage: `url(${props.imgUrl})` }}
        />
      </Link>
    );
}