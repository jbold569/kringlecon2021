// Note: For this lab, we will be working with QRP Corporation's CQC-11 FPGA.
// The CQC-11 operates with a 125MHz clock.
// Your design for a tone generator must support the following 
// inputs/outputs:
// (NOTE: DO NOT CHANGE THE NAMES. OUR AUTOMATED GRADING TOOL
// REQUIRES THE USE OF THESE NAMES!)
// input clk - this will be connected to the 125MHz system clock
// input rst - this will be connected to the system board's reset bus
// input freq - a 32 bit integer indicating the required frequency
//              (0 - 9999.99Hz) formatted as follows:
//              32'hf1206 or 32'd987654 = 9876.54Hz
// output wave_out - a square wave output of the desired frequency
// you can create whatever other variables you need, but remember
// to initialize them to something!

`timescale 1ns/1ns
module tone_generator (
    input clk, // 125 MHz
    input rst,
    input [31:0] freq,
    output wave_out
);
    parameter CLK_FREQ = 125000000.0;
    integer counter;
    real freq_pd = 100.0/freq; // 100 accounts for freq
    integer count = $rtoi(CLK_FREQ*freq_pd);
    reg signal;
    assign wave_out = signal;
    // ---- DO NOT CHANGE THE CODE ABOVE THIS LINE ---- 
    // ---- IT IS NECESSARY FOR AUTOMATED ANALYSIS ----
    // TODO: Add your code below. 
    // Remove the following line and add your own implementation.
    //$rtoi(real_no * 10) - ($rtoi(real_no) * 10) > 4, add 1 
   
    always @(edge clk or posedge rst ) begin
        if(rst == 1) begin
            counter <= 0;
            signal <= 0;
        end
        else begin
            if(counter == count) begin
                counter <= 0;
                signal <= signal ^ 1'b1;
            end
            else begin
                counter <= counter + 1;
            end
        end    
    end
endmodule

