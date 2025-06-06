#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use JSON;
use Bio::SeqIO;

# Create CGI object
my $cgi = CGI->new;
print $cgi->header('application/json');

# Handle file upload
my $upload = $cgi->upload('genbank_file');
unless ($upload) {
    print encode_json({ error => 'No file uploaded.' });
    exit;
}

# Read GenBank file
my $seqio = Bio::SeqIO->new(-fh => $upload, -format => 'genbank');
my $seq = eval { $seqio->next_seq };

unless ($seq) {
    print encode_json({ error => 'Invalid GenBank file format or parsing failed.' });
    exit;
}

# Initialize containers
my %counts;
my @features;

# Extract features
for my $feat ($seq->get_SeqFeatures) {
    my $type = $feat->primary_tag;
    $counts{$type}++;

    my %feat_data = (
        type     => $type,
        location => eval { $feat->location->to_FTstring } || 'unknown'
    );

    $feat_data{gene}    = join(", ", $feat->get_tag_values('gene'))    if $feat->has_tag('gene');
    $feat_data{product} = join(", ", $feat->get_tag_values('product')) if $feat->has_tag('product');

    push @features, \%feat_data;
}

# Return structured JSON
print encode_json({
    counts   => \%counts,
    features => \@features
});
