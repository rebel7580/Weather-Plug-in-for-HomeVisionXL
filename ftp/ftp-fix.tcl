# Fix for a race condition in the ftp package. See tcllib bug #2054498

#############################################################################
#
# HandleVar --
#
# Handles data transfer for get/put commands that use buffers instead
# of files.
# 
# Arguments:
# sock - 		socket name (data channel)

proc ::ftp::HandleVar {s sock} {
    upvar ::ftp::ftp$s ftp
    variable VERBOSE

#   if {$ftp(Start_Time) == -1} {
#	set ftp(Start_Time) [clock seconds]
#   }
#
    if { ![eof $sock] } {
        set buffer [read $sock]
        if { $buffer != "" } {
#	    bug report 2054498 
#	    move above check to here to avoid error if bad file name
	    if {$ftp(Start_Time) == -1} {
		set ftp(Start_Time) [clock seconds]
	    }
	    append ftp(GetData) $buffer
            incr ftp(Total) [string length $buffer]
        }	
    } else {
        close $sock
        catch {unset ftp(state.data)}
        if { $VERBOSE } {
            DisplayMsg $s "D: Port closed" data
        }
    }
    return
}
