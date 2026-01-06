function Logo({ className = "h-8 w-8", ...props }) {
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
