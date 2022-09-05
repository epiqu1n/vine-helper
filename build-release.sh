# Get args
while getopts "v:" arg
do
  case "${arg}" in
    v) version=$OPTARG;;
  esac
done

# Append version to filename if provided
zipname="VineHelper"
if [ -n "${version}" ]
then
  zipname="${zipname}_v${version}"
fi

echo "Building dist for release..."

NODE_ENV=production npx webpack

rm -rf "VineHelper"
mkdir -p ".tmp"
cp -r "dist" ".tmp/VineHelper"

mkdir -p "builds"
cd ".tmp"
zip -r "../builds/${zipname}.zip" "VineHelper"

cd "../"
rm -rf ".tmp/VineHelper"