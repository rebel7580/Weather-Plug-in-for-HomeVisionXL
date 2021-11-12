if {![package vsatisfies [package provide Tcl] 8.2]} {return}
package ifneeded ftp 2.4.8 "source [list [file join $dir ftp.tcl]];\
	source [list [file join $dir ftp-fix.tcl]]"
