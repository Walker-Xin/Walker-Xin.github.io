# _plugins/bib_parser.rb
# Parses _publications/references.bib at build time and:
#   1. Exposes site.config['bibliography'] as a hash of key => entry fields.
#   2. Writes _data/bibliography.yml so GitHub Pages (--safe mode) can use it.
#
# Each entry key maps to a hash with lowercase field names, e.g.:
#   { "author" => "Wenkang Xin and ...", "title" => "...", ... }

require 'yaml'

module Jekyll
  module BibParser
    ENTRY_RE = /@\w+\s*\{\s*(\S+)\s*,\s*\n(.*?)\n\s*\}/m
    FIELD_RE = /(\w+)\s*=\s*\{(.*?)\},?\s*$/

    def self.parse(site)
      path = File.join(site.source, '_publications', 'references.bib')
      return unless File.exist?(path)

      content = File.read(path)
      entries = {}

      content.scan(ENTRY_RE) do |key, body|
        entry = {}
        body.each_line do |line|
          line = line.strip
          next if line.empty? || line.start_with?('%') || line.start_with?('@')
          if (m = line.match(FIELD_RE))
            entry[m[1].downcase] = m[2].strip
          end
        end
        entries[key] = entry unless entry.empty?
      end

      site.config['bibliography'] = entries
      Jekyll.logger.info "BibParser:", "Loaded #{entries.size} entries from references.bib"

      # Write _data/bibliography.yml for GitHub Pages compatibility
      yaml_path = File.join(site.source, '_data', 'bibliography.yml')
      File.write(yaml_path, YAML.dump(entries))
      Jekyll.logger.info "BibParser:", "Wrote #{entries.size} entries to _data/bibliography.yml"
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  Jekyll::BibParser.parse(site)
end
