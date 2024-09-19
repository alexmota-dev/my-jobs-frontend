import { Box, Skeleton } from "@mui/material"

export const ProfileSkeleton = () => {
  return (
    <Box sx={{ pt: 0.5 }}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton width="30vh" height={40} style={{ marginLeft: "16px" }} />
      </Box>
      <Skeleton width="40vh" height={100} />
    </Box>
  )
}
