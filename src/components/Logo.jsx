function Logo({ className = "h-6 w-6", ...props }) {
  return (
    <img 
      src="/logo.png" 
      alt="Logo" 
      className={className} 
      {...props} 
    />
  );
}

export default Logo;
