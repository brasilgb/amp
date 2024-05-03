
interface LogoProps {
    width?: any;
}
 const ApplicationLogo = ({width}: LogoProps) => {
    return (
        <div className={`${width} flex items-center justify-center`}>
            <img src="logo/automahost.png" alt="Logo" />
        </div>
    );
}
export default ApplicationLogo;